#!/usr/bin/env node

const emojilib = require('emojilib');
const allEmoji = emojilib.lib;

(function () {

    "use strict";

    /**
     * Convert regular and boring text into Nibba meme text.
     *
     * @author College boy Michael Scofield
     * @license IDGAF
     */
    var emoji = {

        /**
         * Convert a string to NIBBA based on the character map.
         *
         * @param string string Regular ol' text to convert
         * @return string
         */
        convert: function (string) {
            // convert string to array
            var stringArray = string.split(' ');

            for  (var str in stringArray) {
              var word = stringArray[str];

              // Maybe this is a plural word but the word is the singular?
              let maybeSingular = '';
              if (word.length > 2 && word[word.length - 1] == 's') {
                maybeSingular = word.slice(0, word.length - 1);
              }

              // Maybe this is a singular word but the word is the plural?
              let maybePlural = (word.length == 1) ? '' : word + 's';

              let maybeVerbedSimple = '';
              let maybeVerbedVowel = '';
              let maybeVerbedDoubled  = '';

              if (word.indexOf('ing') !== -1) {
              let verb = word.substr(0, word.length - 3);
              // eating -> eat
              maybeVerbedSimple = verb;
              // dancing -> dance
              maybeVerbedVowel = verb + 'e';
              // running -> run
              maybeVerbedDoubled = verb.substr(0, verb.length - 1);
            }
            // Go through all the things and find the first one that matches.
            let useful = [];

            // If this is already an emoji, don't try to translate it.
            if (emoji.isAlreadyEmoji(word)) {
              useful.push(word);
            }

            // If it's "i" or "i", add some faces to it.
            if (word === 'i' || word === 'you') {
              useful.push('😀');
              useful.push('😊');
            } else if (word === 'she'){
              useful.push('💁');
            } else if (word === 'he'){
              useful.push('💁‍♂️');
            } else if (word === 'we' || word === 'they') {
              useful.push('👩‍👩‍👦‍👦');
            } else if (word === 'am' || word === 'is' || word === 'are') {
              useful.push('👉');
            } else if (word === 'thanks') {
              useful.push('🙌');
            }
            for (let emoji in allEmoji) {
            let words = allEmoji[emoji].keywords;
            // TODO: omg refactor this one day, please. Why is this even. Why.
            if (word == allEmoji[emoji].char ||
                emoji == word || (emoji == word + '_face') ||
                emoji == maybeSingular || emoji == maybePlural ||
                emoji == maybeVerbedSimple || emoji == maybeVerbedVowel || emoji == maybeVerbedDoubled ||
                (words && words.indexOf(word) >= 0) ||
                (words && words.indexOf(maybeSingular) >= 0) ||
                (words && words.indexOf(maybePlural) >= 0) ||
                (words && words.indexOf(maybeVerbedSimple) >= 0) ||
                (words && words.indexOf(maybeVerbedVowel) >= 0) ||
                (words && words.indexOf(maybeVerbedDoubled) >= 0)) {
                // If it's a two letter word that got translated to a flag, it's 99% of the
                // time incorrect, so stop doing that.
                if (!(word.length <= 3 && allEmoji[emoji].category == 'flags')) {
                  useful.push(allEmoji[emoji].char);
                }
              }
            }
            // If emojis found for word grab a random one and parse it in the stringArray;
            if (useful.length > 0) {
              var usingemoji = Math.floor(Math.random() * useful.length);
              stringArray[str] = useful[usingemoji];
            }
          }
          string = stringArray.join(' ');
          return string;
        },


        /**
         * Returns true if the word is already an emoji
         * @param {String} word The word to be translated
         * @returns {Bool}
         */
        isAlreadyEmoji: function(word) {
          let ranges = [
              '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
              '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
              '\ud83d[\ude80-\udeff]' // U+1F680 to U+1F6FF
          ];
          return word.match(ranges.join('|')) !== null;
        }

    };

    if (/(^|\/)mojify(\.js)?$/.test(process.argv[1])) {
        if (undefined !== process.argv[2]) {
            console.log(emoji.convert(process.argv[2]));
        } else {
            console.error('Usage: mojify.js <string>');
        }
    } else if (undefined !== exports) {
        exports.convert = emoji.convert;
    } else {
        console.error("¯\_(ツ)_/¯");
    }

}());

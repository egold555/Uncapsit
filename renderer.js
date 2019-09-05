const Tag = require("en-pos").Tag;

const fs = require("fs");

var namesTxt = undefined;

function loadNamesTXTIntoMemory() {
    if (namesTxt == undefined) {
        var data = fs.readFileSync('assets/docs/names.txt');
        namesTxt = data.toString().replace('[^a-zA-Z]', '').split(/[\r\n]+/); //remove anything but a-z A-Z and split / remove every type of line break
        console.log("Size: " + namesTxt.length);
    }
}

String.prototype.toSentenceCase = function () {
    var str;
    var rg = /(^\w{1}|(\.|\?|!)\s+\w{1})/gi;
    str = this.toLowerCase().replace(rg, function (toReplace) {
        return toReplace.toUpperCase();
    });
    return str;
};

String.prototype.capitalize = function () {
    return this.replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
    });
};

$("#inputbox").on('change keyup paste', function () {
    loadNamesTXTIntoMemory();
    var box = $('#inputbox');
    var text = box.val();
    text = text.replace('\t', '')
    text = text.toSentenceCase();
    // $.each(words_with_capital_first_letter, function (key, value) {
    //     text = text.replace(" " + key + " ", " " + value + " ").replace(" " + key + ".", " " + value + ".").replace(" " + key + "!", " " + value + "!").replace(" " + key + "?", " " + value + "?").replace(" " + key + "\"", " " + value + "\"");
    // });

    var textNew = text.replace('/\W+/', ' '); //CHANGES WHITESPACES TO SPACE
    textNew = textNew.replace(/\n/g, ' '); //REMOVE NEWLINES AND MAKE THEM SPACE
    var textRegexd = textNew.replace(/[^a-z\s]/ig, ''); //remove anything like .,<>/?';:

    var theArray = textRegexd.split(' ');

    /*

+------------+---------------------------+-------------------------------+
| Annotation | Name                      | Example                       |
+------------+---------------------------+-------------------------------+
| NN         | Noun                      | dog man                       |
+------------+---------------------------+-------------------------------+
| NNS        | Plural noun               | dogs men                      |
+------------+---------------------------+-------------------------------+
| NNP        | Proper noun               | London Alex                   |
+------------+---------------------------+-------------------------------+
| NNPS       | Plural proper noun        | Smiths                        |
+------------+---------------------------+-------------------------------+
| VB         | Base form verb            | be                            |
+------------+---------------------------+-------------------------------+
| VBP        | Present form verb         | throw                         |
+------------+---------------------------+-------------------------------+
| VBZ        | Present form (3rd person) | throws                        |
+------------+---------------------------+-------------------------------+
| VBG        | Gerund form verb          | throwing                      |
+------------+---------------------------+-------------------------------+
| VBD        | Past tense verb           | threw                         |
+------------+---------------------------+-------------------------------+
| VBN        | Past participle verb      | thrown                        |
+------------+---------------------------+-------------------------------+
| MD         | Modal verb                | can shall will may must ought |
+------------+---------------------------+-------------------------------+
| JJ         | Adjective                 | big fast                      |
+------------+---------------------------+-------------------------------+
| JJR        | Comparative adjective     | bigger                        |
+------------+---------------------------+-------------------------------+
| JJS        | Superlative adjective     | biggest                       |
+------------+---------------------------+-------------------------------+
| RB         | Adverb                    | not quickly closely           |
+------------+---------------------------+-------------------------------+
| RBR        | Comparative adverb        | less-closely faster           |
+------------+---------------------------+-------------------------------+
| RBS        | Superlative adverb        | fastest                       |
+------------+---------------------------+-------------------------------+
| DT         | Determiner                | the a some both               |
+------------+---------------------------+-------------------------------+
| PDT        | Predeterminer             | all quite                     |
+------------+---------------------------+-------------------------------+
| PRP        | Personal Pronoun          | I you he she                  |
+------------+---------------------------+-------------------------------+
| PRP$       | Possessive Pronoun        | I you he she                  |
+------------+---------------------------+-------------------------------+
| POS        | Possessive ending         | 's                            |
+------------+---------------------------+-------------------------------+
| IN         | Preposition               | of by in                      |
+------------+---------------------------+-------------------------------+
| PR         | Particle                  | up off                        |
+------------+---------------------------+-------------------------------+
| TO         | to                        | to                            |
+------------+---------------------------+-------------------------------+
| WDT        | Wh-determiner             | which that whatever whichever |
+------------+---------------------------+-------------------------------+
| WP         | Wh-pronoun                | who whoever whom what         |
+------------+---------------------------+-------------------------------+
| WP$        | Wh-possessive             | whose                         |
+------------+---------------------------+-------------------------------+
| WRB        | Wh-adverb                 | how where                     |
+------------+---------------------------+-------------------------------+
| EX         | Expletive there           | there                         |
+------------+---------------------------+-------------------------------+
| CC         | Coordinating conjugation  | & and nor or                  |
+------------+---------------------------+-------------------------------+
| CD         | Cardinal Numbers          | 1 7 77 one                    |
+------------+---------------------------+-------------------------------+
| LS         | List item marker          | 1 B C One                     |
+------------+---------------------------+-------------------------------+
| UH         | Interjection              | ah oh oops                    |
+------------+---------------------------+-------------------------------+
| FW         | Foreign Words             | viva mon toujours             |
+------------+---------------------------+-------------------------------+
| ,          | Comma                     | ,                             |
+------------+---------------------------+-------------------------------+
| :          | Mid-sent punct            | : ; ...                       |
+------------+---------------------------+-------------------------------+
| .          | Sent-final punct.         | . ! ?                         |
+------------+---------------------------+-------------------------------+
| (          | Left parenthesis          | ) } ]                         |
+------------+---------------------------+-------------------------------+
| )          | Right parenthesis         | ( { [                         |
+------------+---------------------------+-------------------------------+
| #          | Pound sign                | #                             |
+------------+---------------------------+-------------------------------+
| $          | Currency symbols          | $ € £ ¥                       |
+------------+---------------------------+-------------------------------+
| SYM        | Other symbols             | + * / < >                     |
+------------+---------------------------+-------------------------------+
| EM         | Emojis & emoticons        | :) ❤                          |
+------------+---------------------------+-------------------------------+

    */

    var tags = new Tag(theArray)
        .initial() // initial dictionary and pattern based tagging
        .tags;
    console.log(tags);


    console.log(theArray);

    for (var i = 0; i < theArray.length; i++) {

        var word = theArray[i];
        var wTag = tags[i];
        if (wTag == "NNP") {
            var fixedWord = word.capitalize();

            text = text.replace(" " + word + " ", " " + fixedWord + " ");

            console.log("Found: " + word + " | " + fixedWord)
        }

    }

    for(var nameIndex in namesTxt){
        var name = namesTxt[nameIndex];
        var nameLowercase = name.toLowerCase();

        if(name == " " || name == "" || name === " " || name === ""){
            continue;
        }

        for (var i = 0; i < theArray.length; i++) {
            var word = theArray[i].toLowerCase();
            //console.log("Trying name: \"" + nameLowercase + "\" for word " + word)
            
            if(word == " " || word == "" || word === " " || word === ""){
                continue;
            }

            if(word == nameLowercase || word === nameLowercase){

                

                text = text.replace(" " + word + " ", " " + name + " ");
                console.log("Found name: " + word + " | " + nameLowercase)
            }
        }

    }

    text = text.replace(" i ", " I ");

    box.val(text);
});
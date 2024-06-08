let term = require('terminal-kit').terminal;

let word_inventory = ["^keep","ykolk"]
let chosen_words = []



let goal_word = "key"


term("You inventory has the words: ^+" + word_inventory + "\n")

function terminate() {
	term.grabInput( false ) ;
	setTimeout( function() { process.exit() } , 100 ) ;
}

term(`Enter the words you want to use to contruct the goal word ^y${goal_word}^:\n`)
for(let i = 0; i < word_inventory.length; i++){
	term(`${i+1}. ^+${word_inventory[i]}\n`)
}

term.grabInput();
let idx_array = [];

term.on( 'key' , function( name , matches , data ) {
	if(data.isCharacter){
		term(name + "\n")
		idx_array.push(name)
	}
	if (name === 'ENTER'){
		idx_array.forEach(element => {
			let idx = parseInt(element)-1
			if(!chosen_words.includes(word_inventory[idx])){
				chosen_words.push(word_inventory[idx])	
			}
		});
		let [correct_words, wordMade, ifSame] = checkIftheWordsMakeWord(chosen_words,goal_word)

		term("\nThe word you made with the chosen words: " + wordMade)
		if(ifSame){
			term("\nThe word you made is the correct word:" + ifSame)
			terminate()
		}else{
			term("\nThe word you made is not the correct word:" + !ifSame)
			terminate()
		}
		term("\nThe words you used to make it: "+ chosen_words)
		term("\nThe words that had the correct letter: "+ correct_words)
	}
	if ( name === 'CTRL_C' ) { terminate() ; }
} ) ;

function checkIftheWordsMakeWord(chosen_words, goal_word){
	let correct_words = []
	let done_letters = []
	let goal_array = goal_word.split('');
	let wordMade = ""
	term("\n"+goal_array)
	term('\n')

	//Should order of the word arranged matter? - YES
	chosen_words.forEach((val)=>{
		val.split('').forEach((letter,val_idx)=>{
			let isInGoal = goal_array.includes(letter); 
			if(isInGoal && !done_letters.includes(letter)){ //The letter is in the goal word and it is not checked
				colourWord(val,letter);
				if(!done_letters.includes(letter) && !correct_words.includes(val)){// The letter is not checked and the word is not checked
					correct_words.push(val)
				}
				done_letters.push(letter)
			}
		})

	})
	let ifArrayEqual = done_letters.equals(goal_array)
	wordMade = done_letters.join('')
	return [correct_words, wordMade, ifArrayEqual]
}

function colourWord(word, letter){
	let idx = word.indexOf(letter)
	let array = []
	if(idx == 0){
		array = [word.slice(0,idx+1), word.slice(idx+1,word.length)]
	}else{
		array = [word.slice(0,idx),word.slice(idx,idx+1), word.slice(idx+1,word.length)]
	}
	array.forEch((val)=>{
		if(val === letter){
			term("^y"+val+"^:")
		}
	})
}



// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;
    // if the argument is the same array, we can be sure the contents are same as well
    if(array === this)
        return true;
    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});
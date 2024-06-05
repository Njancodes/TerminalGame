let term = require('terminal-kit').terminal;

let word_inventory = ["lackey","eyolk",'termites']
let chosen_words = []
let correct_words = []


let goal_word = "key"
let goal_array = goal_word.split('');
term("\n"+goal_array)
term('\n')

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
let counter = 0;
let done_letters = []

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

		//Should order of the word arranged matter? - YES
		chosen_words.forEach((val, chosen_idx)=>{
			// goal_array.forEach((goal_val)=>{
			// 	let val_idx = val.indexOf(goal_val)
			// 	let isCaret = val_idx - 1 == val.indexOf('^') && val_idx > 0 ? true : false;
			// 	if(val.includes(goal_val) && !isCaret && !done_letters.includes(goal_val)){
			// 		if(val_idx == 0){
			// 			val=`^y${val.slice(0,val_idx + 1)}^:${val.slice(val_idx+1)}`
			// 		}else{
			// 			val = `${val.slice(0,val_idx)}^y${val.slice(val_idx, val_idx+1)}^:${val.slice(val_idx+1)}`
			// 		}
			// 		done_letters.push(goal_val) //Problem about this method is repetition of letters in the goal word will not be detected
			// 	}
			// })
			// if(val.includes('^y')){
			// 	correct_words.push(val);
			// }
			val.split('').forEach((letter,val_idx)=>{
				let isInGoal = goal_array.includes(letter); 
				if(isInGoal){
					counter++ // Debugging
					done_letters.push(letter)
				}
			})
			let equalLength = done_letters.length == goal_array.length
			let equalOrder = done_letters.every()
			if(counter >= goal_array.length){
				correct_words.push(val)
			}
		})

		if(counter >= goal_array.length){
			console.log(done_letters)
			term("\n It is correct: "+correct_words+"\n")
			terminate()
		}else{
			console.log(done_letters)
		}


	}
	if ( name === 'CTRL_C' ) { terminate() ; }
} ) ;
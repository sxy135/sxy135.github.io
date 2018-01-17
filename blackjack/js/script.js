//Group Members: Xiaoyu Sun, Andrew McDowell, Brahm Persaud
//global variables
var types = ["spade","club","heart","diamond"];
var numbers = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];                          
var chips;
var pot;
var bankroll = 2000; //the player has 2000 at start
//card constructor
function Card(type, number){
	this.type = type;
	this.number = number;
	this.img = "images/"+ this.number + "_" +this.type + ".png";
	
	this.setValue = function(){
		//console.log("start setting value");
		//console.log(this.number);
		if(this.number == "J" || this.number=="K" || this.number == "Q"){
			this.value = 10;
		}
		else if(this.number == "A"){
			this.value = 11;//A's default value is 11
		}
		else{
			this.value = parseInt(this.number);
		}
		//console.log("value: "+this.value);
	}

	this.getValue = function(){
		return this.value;
	}
	
	this.getImg = function(){
		return this.img;
	}

	this.getType = function(){
		return this.type;
	}
	
	this.getNumber = function(){
		return this.number;
	}
}

//define deck and methods of deck
function Deck(){
	var cards = [];
	var newCards = [];
	this.createDeck = function(){
		for(var i=0;i<52;i++){
			var cardType = types[i%4];
			var cardNumber = numbers[i%13];
			cards[i] = new Card(cardType,cardNumber); //create new cards array
			//console.log(cards[i].getType()+" "+cards[i].getNumber());
			cards[i].setValue();
		}
		
	}

	this.shuffle = function (){	
		//console.log("start shuffling");
		for(var i=0;i<52;i++){
			var num = Math.floor(Math.random()*cards.length); //select a random number between 0 and deck length
			//console.log(num+' ');
			newCards[i] = cards[num]; //copy this card to the new array
			newCards[i].setValue();
			cards.splice(num,1); //delete this card from the original array and shift cards in this array
		}
		cards = newCards;//use the new cards array to play the game
		console.log("finish shuffling");
	}
	this.deal = function(){
		if(cards.length == 0){
			console.log("run out of cards");
			createDeck(); //create a new deck when the cards array is empty
			this.shuffle(); // shuffling before play
		}
		return cards.pop(); //deal the first card of the deck and remove it from the deck
	}
	this.getCards = function(){
		return this.cards;
	}
}

//hand object, includes all the methods and properties used in each hand
function Hand(deck){
	var currentCards = []; //store the shown cards in one hand
	this.card1 = deck.deal();
	this.card2 = deck.deal();
	currentCards.push(this.card1, this.card2); //begin with two cards

	this.getFirstCard = function(){
		return this.card1;
	}

	this.getSecondCard = function(){
		return this.card2;
	}

	
	this.getTotalValue = function(){
		console.log("calculating score");
		var total = 0;
		var cardA = 0;
		for(var i=0;i<currentCards.length;i++){
			total += currentCards[i].getValue();
			if(currentCards[i].getValue()==11){
				cardA += 1;
			}
		}

		while(total>21 && cardA>0){
			total -= 10; //change A's value to 1
			cardA -= 1;
		}
		console.log("score: "+total);
		return total;
	}

	this.hit = function(){
		var cardHit = deck.deal();
		currentCards.push(cardHit);
		for(var i=0; i<currentCards.length;i++){
			console.log("currentCards"+(i+1)+" number: "+currentCards[i].getNumber()+" value: "+currentCards[i].getValue());
		}
		return cardHit.getImg();
		
	}
	//console.log("Player Total Value: "+this.getTotalValue());
	
}

//dealer object
function Dealer(deck){
	this.dealerHand = new Hand(deck);
	//console.log("Dealer Created");
	this.dealerPlay = function(){
		//dealer's rule of hit
		while(this.dealerHand.getTotalValue()<17){ 
		//pop a card from deck and attach its image to the page
		var newIMG = document.createElement("img");
		newIMG.src = this.dealerHand.hit();
		var newCard= document.createElement("span");
		newCard.class = "cards";
		newCard.appendChild(newIMG);
		document.getElementById("dealer_card").appendChild(newCard);
		console.log("new dealer image attatched");
		document.getElementById("scoreDealer").textContent = this.dealerHand.getTotalValue()+"/21"; //update the score
		}
	}
	this.getDealerHand = function(){
		return this.dealerHand;
	}
}

//player object
function Player(deck){
	this.playerHand = new Hand(deck);
	this.calculateValue = function(){

	}
	this.lose = function(){
		bankroll -= pot;
		document.getElementById("totalMoney").textContent = "Total Money: "+ bankroll;
		document.getElementById('start').style.visibility = 'visible'; // show start button 
		document.getElementById('hit').style.visibility = 'hidden';
		document.getElementById('stand').style.visibility = 'hidden'; //hide the buttons when player wins
		if(bankroll <= 0){
			if(confirm("Sorry, you don't have enough money!")) {
				document.location = 'welcome.html';
			}
			document.getElementById('start').style.visibility = 'hidden'; //users can not play the game if he loses all the money
		}

	}
	this.win = function(){
		bankroll += pot*2;
		document.getElementById('start').style.visibility = 'visible'; // show start button 
		document.getElementById("totalMoney").textContent = "Total Money: "+ bankroll;
		document.getElementById('hit').style.visibility = 'hidden';
		document.getElementById('stand').style.visibility = 'hidden'; //hide the buttons when player loses
	}
	this.tie = function(){
		document.getElementById('start').style.visibility = 'visible'; // show start button 
		document.getElementById('hit').style.visibility = 'hidden';
		document.getElementById('stand').style.visibility = 'hidden'; //hide the buttons when player loses
	}

	this.getPlayerHand = function(){
		return this.playerHand;
	}


}

//determine who is the winner and show message to user
function showResult(player,dealer){
	var gameOver = true;
	var message;
	pValue = player.getPlayerHand().getTotalValue();
	dValue = dealer.getDealerHand().getTotalValue();
	console.log("determining result: "+pValue+","+dValue);
	if(pValue == 21 && dValue!=21){
		message = "BlackJack! Congratulations, you win!";
		player.win();
	}
	else if (dValue == 21 && pValue != 21){
		message = "BlackJack! Sorry, you lose!";
		player.lose();
	}
	else if(pValue == 21 && dValue == 21){
		message = "It's a tie!";
		player.tie();
	}
	else if(pValue > 21 ){
		message = "Bust! Sorry, you lose!";
		player.lose();
	}
	else if(dValue > 21){
		message = "Bust! Congratulations, you win!";
		player.win();
	}
	else{
		gameOver = false; //no one >= 21
	}
	
	document.getElementById("gameText").textContent = message; //change the message in HTML
	
	//if someone >= 21, this hand is over, show dealer's card and score 
	if(gameOver == true){ 
		document.getElementById("scoreDealer").textContent = dValue+"/21";
		document.getElementById("secondCardDealer").src = dealer.getDealerHand().getSecondCard().getImg();
	}
	return gameOver;
}

//play the game
function startGame(){

	document.getElementById('start').style.visibility = 'hidden'; //hide start button
	
	var playerCardImages = document.getElementById("player_card");
	var dealerCardImages = document.getElementById("dealer_card");
	if(playerCardImages.childNodes.length>2){
		for(var i=playerCardImages.childNodes.length-1;i>1;i--){
			console.log("deleting nodes"+(i+1));
			playerCardImages.removeChild(playerCardImages.childNodes[i]);
		}

	} //remove extra card images 
	if(dealerCardImages.childNodes.length>2){
		for(var i=dealerCardImages.childNodes.length-1;i>1;i--){
			console.log("deleting nodes"+(i+1));
			dealerCardImages.removeChild(dealerCardImages.childNodes[i]);
		}

	} //remove extra card images 

	document.getElementById("secondCardDealer").src = "images/poker_back.png" //show back image of the deal's second card

	document.getElementById('hit').style.visibility = 'visible';
	document.getElementById('stand').style.visibility = 'visible'; //show all the hidden buttons

	
	bankroll -= pot; // place the bet
	
	
	var deck = new Deck(); 
	deck.createDeck(); // create a new deck
	deck.shuffle(); //shuffle the cards before player

	var dealer = new Dealer(deck); // create player object
	
	document.getElementById("firstCardDealer").src = dealer.getDealerHand().getFirstCard().getImg(); 
	document.getElementById("scoreDealer").textContent = dealer.getDealerHand().getFirstCard().getValue()+"/21"; //only show deal's first card
	
	var player = new Player(deck);//create a new player 
	document.getElementById("totalMoney").textContent = "Total Money: " + bankroll; //show player's initial money
	document.getElementById("firstCardPlayer").src = player.getPlayerHand().getFirstCard().getImg();
	document.getElementById("secondCardPlayer").src = player.getPlayerHand().getSecondCard().getImg(); //show the first two cards of the player
	document.getElementById("scorePlayer").textContent = player.getPlayerHand().getTotalValue()+"/21"; //show play's initial score
	
	showResult(player,dealer); //check if someone >=21 before going on
	
	//if user click on "hit"
	document.getElementById("hit").onclick = function(){
		//pop a card from the deck and add this card image to the page
		var newIMG = document.createElement("img");
		newIMG.src = player.getPlayerHand().hit(); 
		newIMG.id = "newIMG"+newIMG.src;
		var newCard= document.createElement("span");
		newCard.class = "cards";
		newCard.appendChild(newIMG);
		document.getElementById("player_card").appendChild(newCard);
		console.log("new player image attatched");
		
		document.getElementById("scorePlayer").textContent = player.getPlayerHand().getTotalValue()+"/21"; //update the player's score
		showResult(player,dealer); //check if the player's new score is >= 21
		
	}

	//if user click on "stand", then dealer will take action
	document.getElementById("stand").onclick = function(){
		document.getElementById("secondCardDealer").src = dealer.getDealerHand().getSecondCard().getImg();
		document.getElementById("scoreDealer").textContent = dealer.getDealerHand().getTotalValue()+"/21"; //show dealers second card and score first
		dealer.dealerPlay(); //dealer play the game according to his rule
		
		//check if dealer's new score is >= 21 after hit, if not, compare their score, the one with a higher score wins
		if(showResult(player,dealer) == false){
			var message;
			if(player.getPlayerHand().getTotalValue() > dealer.getDealerHand().getTotalValue()){
				message = "Congratulations, you win!";
				player.win();
			}
			else if(player.getPlayerHand().getTotalValue() < dealer.getDealerHand().getTotalValue()){
				message = "Sorry, you lose!";
				player.lose();
			}
			else{
				message = "It is a tie!";
				player.tie();
			}
			document.getElementById("gameText").textContent = message; //change the message in HTML
		} 
		
	}
}

//for users to enter their bet amount before playing
function placeBet() {
    
    pot = prompt("Please enter your bet amount: (1-2000)", "100");
    if (pot == null || pot == "") {
    	alert("You did not enter your bet amount, set to default value 100");
        pot = 100; //the default bet amount is 100
    }
    else if(pot > 2000 || pot <= 0){
    	alert("Your bet value is wrong, set to default value 100");
    	pot = 100;
    }

    document.getElementById("chip_text").textContent = "$"+pot;
}

$(document).ready(function(){
    
     $(".cards").fadeIn("slow");
       
    
});
	
	

	














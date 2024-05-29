function GameParticipation(playerChoice) {
    const choices = ['Rock', 'Paper', 'Scissors']
    const computerChoices = choices[Math.floor(Math.random() * choices.length)]

    document.getElementById('playerChoice').textContent = "Your Choice: " + playerChoice;
    document.getElementById('computerChoice').textContent = "Computer Choice: " + computerChoices;

    let result = ''

    if (computerChoices === playerChoice) {
        result = "IT WAS A TIE!"
    } else if ((playerChoice === 'Rock' && computerChoices === 'Scissors') ||
    (playerChoice === 'Paper' && computerChoices === 'Rock') ||
    (playerChoice === 'Scissors' && computerChoices === 'Paper')) {
        result = "YOU'RE THE WINNER!";
}else{
        result = "YOU'RE THE LOSER, THANKS FOR PLAYING.";
    }


document.getElementById('result').textContent = "Result: " + result;

}
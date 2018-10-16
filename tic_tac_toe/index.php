<?php
/***
* File: index.php
* Author: design1online.com, LLC
* Created: 1.31.2012
* License: Public GNU
* Description: PHP/MySQL Version of 2 Player Tic Tac Toe
***/
require_once('oop/class.game.php');
require_once('oop/class.tictactoe.php');

//this will store their information as they refresh the page
session_start();
$_SESSION["scorep1"] = 0;
$_SESSION["scorep2"] = 0;
//if they haven't started a game yet let's load one
if (!isset($_SESSION['game']['tictactoe']))
	$_SESSION['game']['tictactoe'] = new tictactoe();

?>
<html>
	<head>
		<title>Tic Tac Toe</title>
		<link rel="stylesheet" type="text/css" href="inc/style.css" />
	</head>
	<body>
		<div id="content">
		<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
		<h2>Let's Play Tic Tac Toe!</h2>
		<?php
			$_SESSION['game']['tictactoe']->playGame($_POST);
		?>
		</form>
		</div>
	</body>
</html>
<?php

class game {

	var $health;	//int - player's health
	var $over;		//bool - toggle game over
	var $score;		//int - player's score
	var $won;		//bool - toggle game won

	/**
	* Purpose: To setup the game environment variables
	**/
	function start()
	{
		$this->score;
		$this->health = 100;
		$this->over = false;
		$this->won = false;
	}
	
	/**
	* Purpose: end the game if it's game over
	**/
	function end()
	{
		$this->over = true;
	}
	
	/**
	* Purpose: change or retrieve the player's score
	**/
	function setScore($amount)
	{
		return $this->score += $amount;
	}

	function getScore()
	{
		return $this->score;
	}
	
	/**
	* Purpose: change or retrieve the player's health
	**/
	function setHealth($amount = 0)
	{			
		return ceil($this->health += $amount);
	}
	
	/**
	* Purpose: return bool to indiciate whether or not the game is over
	**/
	function isOver()
	{
		if ($this->won)
			return true;
			
		if ($this->over)
			return true;
			
		if ($this->health < 0) 
			return true;
			
		return false;
	}

} //end game class

/**
* Purpose: display a formatted debug message
* Preconditions: the object or message to display
* Postconditions: returns the player's updated score
**/
function debug($object = NULL, $msg = "")
{
	if (isset($object) || isset($msg))
	{
		echo "<pre>";
		
		if (isset($object))
			print_r($object);
			
		if (isset($msg))
			echo "\n\t$msg\n";
		
		echo "\n</pre>";
	}
}

/**
* Purpose: return a formatted error message
* Preconditions: the message to format
* Postconditions: formatted message is returned
**/
function errorMsg($msg)
{
	return "<div class=\"errorMsg\">$msg</div>";
}

/**
* Purpose: return a formatted success message
* Preconditions: the message to format
* Postconditions: formatted message is returned
**/
function successMsg($msg)
{
	return "<div class=\"successMsg\">$msg</div>";
}
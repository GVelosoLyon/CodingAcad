
(function($) // début du pluggin
{
    $.fn.game2048 = function() //function game2048 du pluggin
    {
    	var score = 0;
    	var win = false;
    	var lose = false;
    	var best = 0;
    	
        // génération du tableau (table, tr, td) vide (rempli de zéros)
        function generate_map()
        {
        	var table = $('<table></table>');
        	for (var y = 0; y < 4; y++)
        	{
        		var ligne = $('<tr></tr>');
        		for (var x = 0; x < 4; x++)
        		{
        			var cases = $('<td></td>').attr('x', x).attr('y', y).attr('nbr', 0);
        			ligne.append(cases);
        		}
        		table.append(ligne);
        	}
        	return table;
        }
        // génération d'un certain nombre de cases (argument cases) aléatoirement placées sur les cases d'attribut 'nbr=0'
        function generate_case(cases)
        {
        	for (var i = 0; i < cases; i++)
        	{
        		var x = Math.floor((Math.random() * 4));
        		var y = Math.floor((Math.random() * 4));
                var value = Math.random() < 0.9 ? 2 : 4;//2 * (Math.floor((Math.random() * 2) + 1));
                var elem = $('[x="' + x + '"][y="' + y + '"][nbr=0]');

                if (!elem[0])
                	generate_case(1);
                else 
                {
                	elem.attr('nbr', value);
                	elem.text(value);
                	elem.addClass('nb'+ value + ' new');
                }
            }
        }

        function move_right()
        {
        	var count = 0;
        	var check = false;
        	$("tr td").removeClass("merge");
        	for(j = 0; j < 4; j++)
        	{	
        		for(i = 3; i >= 0; i--)
        		{
        			if ($("tr td[y =" + j + "][x=" + i + "]").text() == "")
        			{
        				count++;
        			}
        			else if (count > 0)
        			{
        				$("tr td[y =" + j + "][x=" + (i + count) + "]").addClass('nb'+$("tr td[y =" + j + "][x=" + i + "]").text());
        				$("tr td[y =" + j + "][x=" + i + "]").removeClass('nb'+$("tr td[y =" + j + "][x=" + i + "]").text());
        				$("tr td").removeClass("new");
        				$("tr td[y =" + j + "][x=" + (i + count) + "]").text($("tr td[y =" + j + "][x=" + i + "]").text());
        				$("tr td[y =" + j + "][x=" + (i + count) + "]").attr('nbr',$("tr td[y =" + j + "][x=" + i + "]").text());
        				$("tr td[y =" + j + "][x=" + i + "]").text("");
        				$("tr td[y =" + j + "][x=" + i + "]").attr('nbr',"0");
        				i += count;
        				count = 0;
        				check = true;
        			}
        		}
        		count = 0;
        	}
        	return check;
        }

        function move_left()
        {
        	var count = 0;
        	var check = false;
        	$("tr td").removeClass("merge");
        	for(j = 0; j < 4; j++)
        	{	
        		for(i = 0; i < 4; i++)
        		{
        			if ($("tr td[y =" + j + "][x=" + i + "]").text() == "")
        			{
        				count++;
        			}
        			else if (count > 0)
        			{
                    	//Attribution des couleurs via les classes;
                    	$("tr td[y =" + j + "][x=" + (i - count) + "]").addClass('nb'+$("tr td[y =" + j + "][x=" + i + "]").text());
                    	$("tr td[y =" + j + "][x=" + i + "]").removeClass('nb'+$("tr td[y =" + j + "][x=" + i + "]").text());
        				$("tr td").removeClass("new");
                    	//Partie 1 de l'echange de valeur, dans le texte puis l'attribut
                    	$("tr td[y =" + j + "][x=" + (i - count) + "]").text($("tr td[y =" + j + "][x=" + i + "]").text());
                    	$("tr td[y =" + j + "][x=" + (i - count) + "]").attr('nbr',$("tr td[y =" + j + "][x=" + i + "]").text());
                 		// Partie 2 de l'echange de valeur.
                 		$("tr td[y =" + j + "][x=" + i + "]").text("");
                 		$("tr td[y =" + j + "][x=" + i + "]").attr('nbr', "0");
                 		i -= count;
                 		count = 0;
        				check = true;
                 	}
                 }
                 count = 0;
             }
             return check;
         }

         function move_up()
         {
         	var count = 0;
        	var check = false;
         	$("tr td").removeClass("merge");
         	for(i = 0; i < 4; i++)
         	{	
         		for(j = 0; j < 4; j++)
         		{
         			if ($("tr td[y =" + j + "][x=" + i + "]").text() == "")
         			{
         				count++;
         			}
         			else if (count > 0)
         			{
         				$("tr td[y =" + (j - count) + "][x=" + i + "]").addClass('nb'+$("tr td[y =" + j + "][x=" + i + "]").text());
         				$("tr td[y =" + j + "][x=" + i + "]").removeClass('nb'+$("tr td[y =" + j + "][x=" + i + "]").text());
        				$("tr td").removeClass("new");
         				$("tr td[y =" + (j - count) + "][x=" + i + "]").text($("tr td[y =" + j + "][x=" + i + "]").text());
         				$("tr td[y =" + (j - count) + "][x=" + i + "]").attr('nbr',$("tr td[y =" + j + "][x=" + i + "]").text());
         				$("tr td[y =" + j + "][x=" + i + "]").text("");
         				$("tr td[y =" + j + "][x=" + i + "]").attr('nbr',"0");
         				j -= count;
         				count = 0;
        				check = true;
         			}
         		}
         		count = 0;
         	}
         	return check;
         }

         function move_down()
         {
         	var count = 0;
        	var check = false;
         	$("tr td").removeClass("merge");
         	for(i = 0; i < 4; i++)
         	{	
         		for(j = 3; j >= 0; j--)
         		{
         			if ($("tr td[y =" + j + "][x=" + i + "]").text() == "")
         			{
         				count++;
         			}
         			else if (count > 0)
         			{
         				$("tr td[y =" + (j + count) + "][x=" + i + "]").addClass('nb'+$("tr td[y =" + j + "][x=" + i + "]").text());
         				$("tr td[y =" + j + "][x=" + i + "]").removeClass('nb'+$("tr td[y =" + j + "][x=" + i + "]").text());
        				$("tr td").removeClass("new");
         				$("tr td[y =" + (j + count) + "][x=" + i + "]").text($("tr td[y =" + j + "][x=" + i + "]").text());
         				$("tr td[y =" + (j + count) + "][x=" + i + "]").attr('nbr',$("tr td[y =" + j + "][x=" + i + "]").text());
         				$("tr td[y =" + j + "][x=" + i + "]").text("");
         				$("tr td[y =" + j + "][x=" + i + "]").attr('nbr',"0");
         				j += count;
         				count = 0;
         				check = true;
         			}
         		}
         		count = 0;
         	}
         	return check;
         }

         function merged_right()
         {
         	var value = 0;
        	var check = false;
         	for(j = 0; j < 4; j++)
        	{	
        		for(i = 3; i >= 0; i--)
        		{
         			if($("tr td[y =" + j + "][x=" + i + "]").attr('nbr') == $("tr td[y =" + j + "][x=" + (i + 1) + "]").attr('nbr'))
         			{
         				if($("tr td[y =" + j + "][x=" + i + "]").attr('nbr') != "0" && $("tr td[y =" + j + "][x=" + i + "]").hasClass("merge") == false)
         				{
         					value = parseInt($("tr td[y =" + j + "][x=" + i + "]").text());
         					$("tr td[y=" + j + "][x=" + (i + 1) + "]").attr('nbr',value * 2);
         					$("tr td[y=" + j + "][x=" + (i + 1) + "]").text(value * 2);
         					$("tr td[y=" + j + "][x=" + (i + 1) + "]").addClass('nb' + (value * 2));
         					$("tr td[y=" + j + "][x=" + (i + 1) + "]").addClass('merge');
         					$("tr td[y=" + j + "][x="+ i + "]").text("");
         					$("tr td[y=" + j + "][x="+ i + "]").attr('nbr',"0");
         					$("tr td[y=" + j + "][x="+ i + "]").removeClass('nb'+ value);
         					$("tr td[y=" + j + "][x="+ (i + 1) + "]").removeClass('nb'+ value);
    						score += value * 2;
         					check = true;
         				}
         			}
         		}
         	}
         	return check;
         }

         function merged_left()
         {
         	var value = 0;
        	var check = false;
         	for(j = 0; j < 4; j++)
        	{	
        		for(i = 0; i < 4; i++)
        		{
         			if($("tr td[y =" + j + "][x=" + i + "]").attr('nbr') == $("tr td[y =" + j + "][x=" + (i - 1) + "]").attr('nbr'))
         			{
         				if($("tr td[y =" + j + "][x=" + i + "]").attr('nbr') != "0" && $("tr td[y =" + j + "][x=" + i + "]").hasClass("merge") == false)
         				{
         					value = parseInt($("tr td[y =" + j + "][x=" + i + "]").text());
         					$("tr td[y=" + j + "][x=" + (i - 1) + "]").attr('nbr',value * 2);
         					$("tr td[y=" + j + "][x=" + (i - 1) + "]").text(value * 2);
         					$("tr td[y=" + j + "][x=" + (i - 1) + "]").addClass('nb' + (value * 2));
         					$("tr td[y=" + j + "][x=" + (i - 1) + "]").addClass('merge');
         					$("tr td[y=" + j + "][x=" + i + "]").text("");
         					$("tr td[y=" + j + "][x=" + i + "]").attr('nbr',"0");
         					$("tr td[y=" + j + "][x=" + i + "]").removeClass('nb'+ value);
         					$("tr td[y=" + j + "][x=" + (i - 1) + "]").removeClass('nb'+ value);
    						score += value * 2;
        					check = true;
         				}
         			}
         		}
         	}
         	return check;
         }

         function merged_up()
         {
         	var value = 0;
        	var check = false;
         	for(i = 0; i < 4; i++)
         	{	
         		for(j = 0; j < 4; j++)
         		{
		         	if($("tr td[y =" + j + "][x=" + i + "]").attr('nbr') == $("tr td[y =" + (j + 1) + "][x=" + i + "]").attr('nbr'))
		         	{
		         		if($("tr td[y =" + j + "][x=" + i + "]").attr('nbr') != "0" && $("tr td[y =" + j + "][x=" + i + "]").hasClass("merge") == false)
		         		{
		         			value = parseInt($("tr td[y =" + j + "][x=" + i + "]").text());
		         			$("tr td[y=" + j + "][x=" + i + "]").attr('nbr',value * 2);
		         			$("tr td[y=" + j + "][x=" + i + "]").text(value * 2);
		         			$("tr td[y=" + j + "][x=" + i + "]").addClass('nb' + (value * 2));
		         			$("tr td[y=" + j + "][x=" + i + "]").addClass('merge');
		         			$("tr td[y=" + (j + 1) + "][x="+ i + "]").text("");
		         			$("tr td[y=" + (j + 1) + "][x="+ i + "]").attr('nbr',"0");
		         			$("tr td[y=" + (j + 1) + "][x="+ i + "]").removeClass('nb'+ value);
		         			$("tr td[y=" + j + "][x=" + i + "]").removeClass('nb'+ value);
    						score += value * 2;
        					check = true;
		         		}
		         	}
		        }
         	}
         	return check;
         }

         function merged_down()
         {
         	var value = 0;
        	var check = false;
         	for(i = 0; i < 4; i++)
         	{	
         		for(j = 3; j >= 0; j--)
         		{
		         	if($("tr td[y =" + j + "][x=" + i + "]").attr('nbr') == $("tr td[y =" + (j - 1) + "][x=" + i + "]").attr('nbr'))
		         	{
		         		if($("tr td[y =" + j + "][x=" + i + "]").attr('nbr') != "0" && $("tr td[y =" + j + "][x=" + i + "]").hasClass("merge") == false)
		         		{
		         			value = parseInt($("tr td[y =" + j + "][x=" + i + "]").text());
		         			$("tr td[y=" + j + "][x=" + i + "]").attr('nbr',value * 2);
		         			$("tr td[y=" + j + "][x=" + i + "]").text(value * 2);
		         			$("tr td[y=" + j + "][x=" + i + "]").addClass('nb' + (value * 2));
		         			$("tr td[y=" + (j + 1) + "][x=" + i + "]").addClass('merge');
		         			$("tr td[y=" + (j - 1) + "][x="+ i + "]").text("");
		         			$("tr td[y=" + (j - 1) + "][x="+ i + "]").attr('nbr',"0");
		         			$("tr td[y=" + (j - 1) + "][x="+ i + "]").removeClass('nb'+ value);
		         			$("tr td[y=" + j + "][x=" + i + "]").removeClass('nb'+ value);
    						score += value * 2;
        					check = true;
		         		}
		         	}
		        }
		    }
		    return check;
         }

        function win_lose() // Vérifie les cas de victoire et défaite.
        {
        	var blank = 0;
        	for (i = 0; i < 4; i++)
        	{
        		for(j = 0; j < 4; j++)
        		{
		         	if($("tr td[y=" + j + "][x="+ i + "]").text() == "")
		         		blank++;
		         	else if ($("tr td[y=" + j + "][x="+ i + "]").text() == "2048")
		         	{
		         		//$("tr td[y=" + j + "][x=" + i + "]").text("");
		         		win = true;
		         	}
        		}
        	}
        	if (blank == 0 && (merged_left() == false && merged_down() == false && merged_up() == false && merged_right() == false))
        		lose = true;
        	else if (win == true)
        	{
        		$('span#win').html('Congratulation, You win !');
		        $("tr td[y" + j + "][x=" + i + "]").text("");
        		return win;
        	}
        	return lose;
        }

        function getCookie(cname) // Récupération de cookie
        {
		    var name = cname + "=";
		    var decodedCookie = decodeURIComponent(document.cookie);
		    var ca = decodedCookie.split(';');
		    for(var i = 0; i <ca.length; i++) {
		        var c = ca[i];
		        while (c.charAt(0) == ' ') {
		            c = c.substring(1);
		        }
		        if (c.indexOf(name) == 0) {
		            return c.substring(name.length, c.length);
		        }
		    }
		    return "";
		}

        $("button").click(function() // Bouton new game
        {
        	$("tr td").attr('nbr', "0");
        	$("tr td").removeClass();
        	$("tr td").text("");
        	score = 0;
        	$('span#score').html(score);
        	lose = false;
        	$('span#win').html("");
        	generate_case(2);
        });

        // fonction de gestion des évenements (appuie de touches)
        $('html').keydown(function(event) 
        {
        	var move;
        	var merge;
        	if (lose == false)
        	{	
	        	switch (event['key']) 
	        	{
	        		case 'ArrowLeft':
	                    // insérer algo move left
	                    move = move_left();
	                    merge = merged_left();
	                    move_left();
	                    win_lose();
	                    
	                    if (move || merge)
	                    	generate_case(1);
	                    console.log("Left");
	                    break;
	                    case 'ArrowUp':
	                    // insérer algo move up
	                    move = move_up();
	                    merge = merged_up();
	                    move_up();
	                    win_lose();

	                    if (move || merge)
	                    	generate_case(1);
	                    console.log("Up");
	                    break;
	                    case 'ArrowRight':
	                    // insérer algo move right
	                    move = move_right();
	                    merge = merged_right();
	                    move_right();
	                    win_lose();

	                    if (move || merge)
	                    	generate_case(1);
	                    console.log("Right");
	                    break;
	                    case 'ArrowDown':
	                    // insérer algo move down
	                    move = move_down();
	                    merge = merged_down();
	                    move_down();
	                    win_lose();

	                    if (move || merge)
	                    	generate_case(1);
	                    console.log("Down");
	                    break;
	                }
	        }
	        else
        		$('span#win').html('Ooooh no... You lose !');
        	$('span#score').html(score);
        	if (score > best)
        	{	
        		document.cookie = "best=" + best;
        		best = score;
        		$('span#best').html(best);
        	}
           });
        
        // début du code lancé
        $(this).append(generate_map()); // génération du tableau vide
        best = getCookie("best"); // Récupération du high score
        $('span#score').html(score);// Affichage
        $('span#best').html(best);// Affichage
        generate_case(2); // génération aléatoire de deux cases pleines (2 ou 4)
    }

})(jQuery); // fin du pluggin
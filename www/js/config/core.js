var core = {
	random: function(min_number , max_number){
		return Math.floor((Math.random() * max_number) + min_number); 
	},
	random_many_number: function(min_number, max_number, number_length, is_unique, is_not_zero){
		var array = {};
		for(var i=0; i<number_length; i++)
		{
			var number = this.random(min_number, max_number);
			if (is_unique != undefined)
			{
				if (typeof array[number] == "undefined")
				{
					if (is_not_zero != undefined)
					{
						if (Number(number) != 0 ) 
							array[number] = true;	
						else
							i--;
					}
					else{
						array[number] = true;	
					}
					
				}
				else{
					i--;
					//console.log("PREV " + i);
				}
			}
			else
			{
				if (is_not_zero != undefined)
				{
					if (Number(number) != 0 ) 
						array[number] = true;	
					else
						i--;
				}
				else{
					array[number] = true;	
				}
			}
			//console.log(i);
		}
		
		
		var result = [];
		for(var i in array)
		{
			var str_number = "";
			if (Number(i)<10)
			{
				str_number = "0" + i;
			}
			else
			{
				str_number = "" + i;
			}
			result.push(str_number);
		}
        result = result.sort();
        
		return result;
	}
};
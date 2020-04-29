const username = {
'13AQHQ2Y9VtRHnHUjUxSrr8net5XxkS6DZ':'yangrf',
'19JxAuxhQCs3C1oeCDAdo7e5NCUuYAg7GM':'lilz',
'1LooTtUZhAALunC7oARFNn4CNZ7QtskaZu':'yuancg'
}

/*
const urls = [
	'13AQHQ2Y9VtRHnHUjUxSrr8net5XxkS6DZ',
	'19JxAuxhQCs3C1oeCDAdo7e5NCUuYAg7GM',
	'1LooTtUZhAALunC7oARFNn4CNZ7QtskaZu'
]*/




function usernameupdate(keyname){
	
	var name = username[keyname]
	if(name){
		return username[keyname]
	}else{
		return null
	}
}






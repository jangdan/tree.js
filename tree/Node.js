var Node = function(name){
	
	//https://en.wikipedia.org/wiki/Tree_(data_structure)#Terminologies_used_in_Trees
	this.name = name;
	this.depth = null;

	this.parent = null;
	this.children = [];

	this.ancestors = [];
	this.decendants = []; //recursively-reachable children, grandchildren, great-grandchildren, etc.
	
}


Node.prototype.addChild = function(child){

	if(!child){ //falsey detection
		console.log("child is "+child);
		return; //"you're not a child!"
	}


	child.parent = this; //understandable without comments
	this.children.push(child);


	this.decendants.push(child); //'child' is a child, but it's also a decendant of 'this'

	Array.prototype.push.apply(this.decendants, child.decendants); //add all existing decendants if 'child' to 'this''s list of decendants

}

Node.prototype.removeChild = function(child){

	if(!child){ //falsey detection
		console.log("child is "+child);
		return; //"you're not a child!"
	}


	child.parent = null; //remove any reference, any relation to 'this'
	this.children.splice(this.children.indexOf(child), 1); //'this' does the same to 'child'

	for(i = 0; i < child.decendants.length; ++i)
		this.decendants.splice(this.decendants.indexOf(child.decendants[i]), 1); //remove all decendants of 'child' from 'this''s decendants

}
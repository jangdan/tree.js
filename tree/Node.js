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
		console.error("child is "+child);
		return; //"you're not a even a node!"
	}


	child.parent = this; //understandable without comments
	child.depth = this.depth + 1;

	this.children.push(child);


	//'this''s ancestors are also 'child''s ancestors
	Array.prototype.push.apply(child.ancestors, this.ancestors);
	child.ancestors.push(this);


	this.decendants.push(child); //'child' is a child, but it's also a decendant of 'this'
	Array.prototype.push.apply(this.decendants, child.decendants); //add all existing decendants if 'child' to 'this''s list of decendants


	for(i = 0; i < this.ancestors.length; ++i){ //'child' is also a decendant of all of 'this''s ancestors
		this.ancestors[i].decendants.push(child);
		Array.prototype.push.apply(this.ancestors[i].decendants, child.decendants);
	}

}

Node.prototype.removeChild = function(child){

	if(!child){ //falsey detection
		console.error("child is "+child);
		return; //"you're one of my children!"
	} else if(this.children.indexOf(child) == -1){
		console.error("child isn't a child of this");
		return;
	}


	child.parent = null; //remove any reference, any relation to 'this'
	this.children.splice(this.children.indexOf(child), 1); //'this' does the same to 'child'

	for(i = 0; i < child.decendants.length; ++i)
		this.decendants.splice(this.decendants.indexOf(child.decendants[i]), 1); //remove all decendants of 'child' from 'this''s decendants

}
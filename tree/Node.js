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
		console.error("The child to add is "+child);
		return; //"you're not a even a node!"
	}


	//changes to 'child'
	child.parent = this; //understandable without comments
	child.depth = this.depth + 1;

	Array.prototype.push.apply(child.ancestors, this.ancestors); //'this''s ancestors are also 'child''s ancestors
	child.ancestors.push(this); //'this' is also an ancestor



	//changes to 'this'
	this.children.push(child);

	this.decendants.push(child); //'child' is a child, but it's also a decendant of 'this'
	Array.prototype.push.apply(this.decendants, child.decendants); //add all existing decendants if 'child' to 'this''s list of decendants



	//changes to the ancestors
	for(i = 0; i < this.ancestors.length; ++i){ //'child' is also a decendant of all of 'this''s ancestors
		this.ancestors[i].decendants.push(child);
		Array.prototype.push.apply(this.ancestors[i].decendants, child.decendants);
	}



	//changes to the decendants
	for(i = 0; i < this.decendants.length; ++i){

		child.decendants[i].ancestors.push(child);
		Array.prototype.push.apply(child.decendants[i].ancestors, this.ancestors);

	}

}




Node.prototype.removeChild = function(child){

	if(!child){ //falsey detection
		console.error("The child to remove is "+child);
		return; //"you're one of my children!"
	} else if(this.children.indexOf(child) == -1){
		console.error("The specified child is not a child of the parent; cannot remove child");
		return;
	}


	child.parent = null; //remove any reference, any relation to 'this'
	child.depth = 0;


	child.ancestors = []; //no more ancestors


	this.children.splice(this.children.indexOf(child), 1); //remove 'child' from the children array

	this.decendants.splice(this.decendants.indexOf(child), 1); //remove 'child' from the decendands array
	for(i = 0; i < child.decendants.length; ++i)
		this.decendants.splice(this.decendants.indexOf(child.decendants[i]), 1); //remove all decendants of 'child' from decendants


	//ADD: recalculate child's decendants' depths
}




Node.prototype.breakBranch = function(){ //probably will change this function name to something else. "breaks" the connection with the parent. a child-to-parent version of removeChild();

	this.parent.removeChild(this);

}




//getters
Node.prototype.getDecendantsByName = function(name){
	return this.decendants.filter( function(decendant){ return decendant.name === name } );
}


Node.prototype.getDecendantByName = function(name){
	//console.log(this.getDecendantsByName(name));
	return this.getDecendantsByName(name)[0];
}



Node.prototype.getChildrenByName = function(name){
	return children.filter( function(child){ return child.name === name } );
}


Node.prototype.getChildByName = function(name){
	return this.getChildrenByName(name)[0];
}
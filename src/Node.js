var Node = function(name){
	
	//https://en.wikipedia.org/wiki/Tree_(data_structure)#Terminologies_used_in_Trees
	this.name = name;
	this.depth = null;

	this.parent = null;
	this.children = [];

	this.ancestors = []; //the parent, grandparent, and so on in ONE ARRAY!
	this.decendants = []; //recursively-reachable children, grandchildren, great-grandchildren, etc.
	
}




Node.prototype.addChild = function(child){

	if(!child){ //falsey detection
		console.error("The child to add is "+child);
		return; //"you're not a even a node!"
	}


	this.children.push(child);

	this.addDecendants( [child] );
	this.addDecendants( child.decendants );


	child.setParent(this);

}



Node.prototype.removeChild = function(child){

	if(!child){ //falsey detection
		console.error("The child to remove is "+child);
		return; //"you're one of my children!"
	} else if(this.children.indexOf(child) == -1){
		console.error("The specified child is not a child of the parent; cannot remove child");
		return;
	}


	this.children.splice(this.children.indexOf(child), 1); //remove 'child' from the children array

	this.removeDecendants( [child] );
	this.removeDecendants( child.decendants );


	child.removeParent(this);
	
}




Node.prototype.breakBranch = function(){ //probably will change this function name to something else. "breaks" the connection with the parent. a child-to-parent version of removeChild();

	this.parent.removeChild(this);

}




Node.prototype.setParent = function(parent){

	this.parent = parent;
	this.depth = parent.depth + 1;

	this.addAncestors( [parent] );
	this.addAncestors( parent.ancestors );

}



Node.prototype.removeParent = function(parent){

	this.parent = null;
	this.depth = 0;

	this.removeAncestors( [parent] );
	this.removeAncestors( parent.ancestors );

}




Node.prototype.addAncestors = function(ancestors){ //"goes down" the tree

	Array.prototype.push.apply(this.ancestors, ancestors);


	this.updateDepth();


	if(this.isLeaf()) return;

	for(i = 0; i < this.children.length; ++i) this.children[i].addAncestors(ancestors);

}



Node.prototype.removeAncestors = function(ancestors){

	for(i = 0; i < ancestors.length; ++i)
		this.ancestors.splice( this.ancestors.indexOf(ancestors[i]), 1 );


	this.updateDepth();


	if(this.isLeaf()) return;

	for(i = 0; i < this.children.length; ++i)
		this.children[i].removeAncestors(ancestors);

}




Node.prototype.updateDepth = function(){

	this.depth = this.parent.depth + 1;

}




Node.prototype.addDecendants = function(decendants){ //"goes up" the tree
	
	Array.prototype.push.apply(this.decendants, decendants);


	if(this.isRoot()) return;

	this.parent.addDecendants(decendants);

}



Node.prototype.removeDecendants = function(decendants){

	for(i = 0; i < decendants.length; ++i)
		this.decendants.splice( this.decendants.indexOf(decendants[i]), 1 );


	if(this.isRoot()) return;

	parent.removeDecendants(decendants);

}




//conditionals
Node.prototype.isLeaf = function(){
	return !this.children.length;
}


Node.prototype.isRoot = function(){
	return !this.depth;
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
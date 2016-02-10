var Tree = function(name){

	this.name = name;

}


Tree.prototype.setRoot = function(root){

	this.root = root;

	this.root.parent = null;
	this.root.depth = 0;

}
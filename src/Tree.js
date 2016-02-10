var Tree = function(name){

	this.name = name;

}


Tree.prototype.setRoot(root){

	this.root = root;

	this.root.parent = null;
	this.root.depth = 0;

}
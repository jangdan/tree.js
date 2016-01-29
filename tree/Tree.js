var Tree = function(name){

	this.name = name;


	this.root = new Node("root");
	
	this.root.parent = null;
	this.root.depth = 0;

}
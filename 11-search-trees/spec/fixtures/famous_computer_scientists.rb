def tree_of_famous_computer_scientists(tree_class)
  tree = tree_class.new

  node_knuth       = tree.create_node
  node_cook        = tree.create_node
  node_shannon     = tree.create_node
  node_church      = tree.create_node
  node_hoare       = tree.create_node
  node_michie      = tree.create_node
  node_von_neumann = tree.create_node
  node_chomsky     = tree.create_node
  node_dijkstra    = tree.create_node
  node_mccarthy    = tree.create_node
  node_turing      = tree.create_node
  node_codd        = tree.create_node
  node_kleene      = tree.create_node
  node_minsky      = tree.create_node
  node_wiener      = tree.create_node

  tree.set_item(node_knuth, "Knuth")
  tree.set_item(node_cook, "Cook")
  tree.set_item(node_shannon, "Shannon")
  tree.set_item(node_church, "Church")
  tree.set_item(node_hoare, "Hoare")
  tree.set_item(node_michie, "Michie")
  tree.set_item(node_von_neumann, "Von Neumann")
  tree.set_item(node_chomsky, "Chomsky")
  tree.set_item(node_dijkstra, "Dijkstra")
  tree.set_item(node_mccarthy, "McCarthy")
  tree.set_item(node_turing, "Turing")
  tree.set_item(node_codd, "Codd")
  tree.set_item(node_kleene, "Kleene")
  tree.set_item(node_minsky, "Minsky")
  tree.set_item(node_wiener, "Wiener")

  tree.set_left(node_knuth, node_cook)
  tree.set_left(node_cook, node_church)
  tree.set_left(node_shannon, node_michie)
  tree.set_left(node_church, node_chomsky)
  tree.set_left(node_hoare, node_dijkstra)
  tree.set_left(node_michie, node_mccarthy)
  tree.set_left(node_von_neumann, node_turing)

  tree.set_right(node_knuth, node_shannon)
  tree.set_right(node_cook, node_hoare)
  tree.set_right(node_shannon, node_von_neumann)
  tree.set_right(node_church, node_codd)
  tree.set_right(node_hoare, node_kleene)
  tree.set_right(node_michie, node_minsky)
  tree.set_right(node_von_neumann, node_wiener)

  tree.top = node_knuth

  tree
end

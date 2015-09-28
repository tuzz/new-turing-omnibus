require "fixtures/famous_computer_scientists"

RSpec.shared_examples "a depth algorithm" do
  let(:tree) { tree_of_famous_computer_scientists(tree_class) }

  it "yields nodes of the tree in depth-first order" do
    items = []

    subject.depth(tree, tree.top) do |node|
      items << tree.item(node)
    end

    expect(items).to eq [
      "Knuth",
      "Cook",
      "Church",
      "Chomsky",
      "Codd",
      "Hoare",
      "Dijkstra",
      "Kleene",
      "Shannon",
      "Michie",
      "McCarthy",
      "Minsky",
      "Von Neumann",
      "Turing",
      "Wiener"
    ]
  end
end

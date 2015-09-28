require "fixtures/famous_computer_scientists"

RSpec.shared_examples "a search algorithm" do
  let(:tree) { tree_of_famous_computer_scientists(tree_class) }

  it "prints 'yes' if the item exists in the tree" do
    expect { subject.search(tree, "Knuth") }.to output("yes\n").to_stdout
    expect { subject.search(tree, "Chomsky") }.to output("yes\n").to_stdout
    expect { subject.search(tree, "Kleene") }.to output("yes\n").to_stdout
  end

  it "prints 'no' otherwise" do
    expect { subject.search(tree, "Paul Hollywood") }.to output("no\n").to_stdout
    expect { subject.search(tree, "Mary Berry") }.to output("no\n").to_stdout
  end
end

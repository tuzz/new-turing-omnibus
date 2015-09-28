require "spec_helper"
require "shared_examples/search_algorithm"

RSpec.describe SearchAlgorithm do
  context "when using an ArrayTree" do
    let(:tree_class) { ArrayTree }

    it_behaves_like "a search algorithm"
  end

  context "when using a MemoryTree" do
    let(:tree_class) { MemoryTree }

    it_behaves_like "a search algorithm"
  end
end

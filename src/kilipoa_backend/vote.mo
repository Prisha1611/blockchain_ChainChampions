actor Kilipoa {
    // Previous definitions...

    public func voteOnProposal(proposalId: Nat): async Bool {
        let indexOpt = proposals.indexesWhere((p) -> p.id == proposalId).head();
        switch (indexOpt) {
            case (?index) {
                proposals[index].votes += 1;
                return true;
            };
            case null {
                return false;
            };
        };
    }
}

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import List "mo:base/List";
import Iter "mo:base/Iter";
import Hash "mo:base/Hash";

actor kilipoa {
    public shared (msg) func whoami() : async Principal {
        return msg.caller;
    };

    // Types
    type ProposalId = Nat;

    type Proposal = {
        id: ProposalId;
        title: Text;
        description: Text;
        author: Principal;
        createdAt: Time.Time;
        votes: Nat;
        status: ProposalStatus;
    };

    type ProposalStatus = {
        #Active;
        #Approved;
        #Rejected;
    };

    type Comment = {
        id: Nat;
        author: Principal;
        content: Text;
        createdAt: Time.Time;
    };

    // State
    private stable var nextProposalId: Nat = 0;
    private stable var nextCommentId: Nat = 0;
    private var proposals = HashMap.HashMap<ProposalId, Proposal>(0, Nat.equal, Hash.hash);
    private var comments = HashMap.HashMap<ProposalId, List.List<Comment>>(0, Nat.equal, Hash.hash);
    private var userVotes = HashMap.HashMap<Principal, List.List<ProposalId>>(0, Principal.equal, Principal.hash);

    // CRUD operations for Proposals
    public func createProposal(title: Text, description: Text, author: Principal) : async ProposalId {
        let id = nextProposalId;
        nextProposalId += 1;

        let newProposal : Proposal = {
            id = id;
            title = title;
            description = description;
            author = author;
            createdAt = Time.now();
            votes = 0;
            status = #Active;
        };

        proposals.put(id, newProposal);
        id
    };

    public query func readProposal(id: ProposalId) : async ?Proposal {
        proposals.get(id)
    };

    public func updateProposal(id: ProposalId, title: Text, description: Text) : async Bool {
        switch (proposals.get(id)) {
            case (null) { false };
            case (?proposal) {
                let updatedProposal : Proposal = {
                    id = proposal.id;
                    title = title;
                    description = description;
                    author = proposal.author;
                    createdAt = proposal.createdAt;
                    votes = proposal.votes;
                    status = proposal.status;
                };
                proposals.put(id, updatedProposal);
                true
            };
        }
    };

    public func deleteProposal(id: ProposalId) : async Bool {
        switch (proposals.remove(id)) {
            case (null) { false };
            case (?_) { true };
        }
    };

    // Voting system
    public func voteForProposal(userId: Principal, proposalId: ProposalId) : async Bool {
        switch (proposals.get(proposalId)) {
            case (null) { false };
            case (?proposal) {
                // Check if user has already voted
                switch (userVotes.get(userId)) {
                    case (null) {
                        userVotes.put(userId, List.make(proposalId));
                    };
                    case (?votedProposals) {
                        if (List.some(votedProposals, func (id: ProposalId) : Bool { id == proposalId })) {
                            return false; // User has already voted
                        };
                        userVotes.put(userId, List.push(proposalId, votedProposals));
                    };
                };

                let updatedProposal : Proposal = {
                    id = proposal.id;
                    title = proposal.title;
                    description = proposal.description;
                    author = proposal.author;
                    createdAt = proposal.createdAt;
                    votes = proposal.votes + 1;
                    status = proposal.status;
                };
                proposals.put(proposalId, updatedProposal);
                true
            };
        }
    };

    // Comment system
    public func addComment(proposalId: ProposalId, author: Principal, content: Text) : async Bool {
        switch (proposals.get(proposalId)) {
            case (null) { false };
            case (?_) {
                let id = nextCommentId;
                nextCommentId += 1;

                let newComment : Comment = {
                    id = id;
                    author = author;
                    content = content;
                    createdAt = Time.now();
                };

                switch (comments.get(proposalId)) {
                    case (null) {
                        comments.put(proposalId, List.make(newComment));
                    };
                    case (?commentList) {
                        comments.put(proposalId, List.push(newComment, commentList));
                    };
                };
                true
            };
        }
    };

    public query func getComments(proposalId: ProposalId) : async [Comment] {
        switch (comments.get(proposalId)) {
            case (null) { [] };
            case (?commentList) {
                List.toArray(commentList)
            };
        }
    };

    // Query all proposals
    public query func getAllProposals() : async [Proposal] {
        Iter.toArray(proposals.vals())
    };

    // Change proposal status
    public func changeProposalStatus(proposalId: ProposalId, newStatus: ProposalStatus) : async Bool {
        switch (proposals.get(proposalId)) {
            case (null) { false };
            case (?proposal) {
                let updatedProposal : Proposal = {
                    id = proposal.id;
                    title = proposal.title;
                    description = proposal.description;
                    author = proposal.author;
                    createdAt = proposal.createdAt;
                    votes = proposal.votes;
                    status = newStatus;
                };
                proposals.put(proposalId, updatedProposal);
                true
            };
        }
    };
}

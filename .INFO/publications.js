export const publications = [

    {
        id: "epistemic-incompleteness-proof",
        title: "A Formal Proof of Epistemic Incompleteness and the Limit of Time-Bound Verification",
        summary: "Questioning truth as a static state, Aristotle's Law of Excluded Middle, Gödel's Incompleteness Theorems...",
        description: `

                        
            <a href="https://en.wikipedia.org/wiki/G%C3%B6del%27s_incompleteness_theorems" 
               title="Kurt Gödel's Incompleteness Theorem"
               style="text-decoration: underline;"
                target="_blank" 
               rel="noopener noreferrer">
            Kurt Gödel's Incompleteness Theorem</a>
            reveals that there are truths in the universe which cannot be proved under a formal system. How can you truly prove your knowledge if the truth exists beyond superposition, and beyond the formal system you are accustomed to?
            <br /><br />
            <a href="https://zenodo.org/records/17716575" 
               title="This paper"
               style="text-decoration: underline;"
                target="_blank" 
               rel="noopener noreferrer">
            This paper</a>, an extension of the 
            
            <a href="https://eni6ma.com/cryptography" 
               title="Rosario-Wang proofs"
               style="text-decoration: underline;"
                target="_blank" 
               rel="noopener noreferrer">
            Rosario-Wang proofs</a>, opens up an entirely new perspective of systemic knowledge. Just knowing the current, most sufficient truth and recognizing it as a static state becomes obsolete. Proof of knowledge shall require an understanding of the causal structure in the system's dynamics, which lies beyond the AI agent's 'Horizon of Indistinguishability'.

            <br /><br />
            Here is a short dive into some of the governing equations:
            <br /><br /><hr><br />
            <b>Proof Definition Model (3.1):</b> A "Proof of Validity" for a signal \\(s_t\\) is defined as a trace \\(\\tau\\) that links \\(s_t\\) back to a valid generator state \\(\\bar{\\omega}_t\\).

            \\(\\Omega\\): The state space of all possible generator states. \\(|\\Omega|\\) denotes the cardinality (size) of this state space, which grows exponentially with \\(N\\).
            \\[
                \\text{Proof}(s_t) \\iff \\exists \\tau \\in \\Omega : \\Pi(\\bar{\\omega}_t) = s_t \\land \\bar{\\omega}_t = \\Delta^t(\\bar{\\omega}_0, K)
            \\]
            That verification requires tracing the signal back through the generator's evolution \\(\\Delta^t\\) from the initial seed state \\(\\bar{\\omega}_0\\) using the key \\(K\\), where \\(\\Pi\\) is the projection from generator states to observable signals.

            <br /><br />
            <hr><br />
            <b>Observer's Limit Function (3.2):</b> For any observer \\(\\mathcal{O}_{\\text{obs}}\\) lacking the seed \\(\\bar{\\omega}_0\\), the probability of distinguishing a valid signal from a random distribution is bounded by the size of the state space.
            \\[
                P(D(s_t) = \\text{Correct}) = \\frac{1}{2} + \\epsilon(N)
            \\]
            \\(N\\) is a complexity-governing parameter, such as the number of rings in the system. The strength of the system occurs as we add complextiy to our system, where \\(\\epsilon(N) \\propto 1/\\sqrt{|\\Omega|} \\to 0\\) as \\(N \\to \\infty\\). The advantage function \\(\\epsilon(N)\\) vanishes with increasing complexity, rendering valid signals statistically indistinguishable from random noise. 
            
            <br /><br />
            In other words, as \\(P(D(s_t) = \\text{Correct}) \\rightarrow \\frac{1}{2} \\), its complement \\(P(D(s_t) = \\text{Incorrect}) \\rightarrow \\frac{1}{2} \\).
            
            <br /><br /><hr><br />
            This opens up to the discussion of "Category C" thinking - Now, the truthfulness of digital information is not simply a binary state, but rather fluid and dependent on the currently valid axioms, drawn from our generator state space \\(\\Omega\\). This way, a false identity holder cannot base their identity on previous occurrences they witnesses, as they are no longer valid.

            <br /><br />

            My work on this paper involved a comprehensive study of Kurt Gödel's incompleteness theorems and their implications for epistemic boundaries in formal verification systems. Through deep engagement with the foundational literature on modal logic, epistemic incompleteness, observer limitations, and general information theory, I am building a rigorous understanding of how the proof definition model and observer's limit function establish fundamental constraints on knowledge verification. This research positions me to contribute novel extensions to the theoretical framework, such as exploring the computational complexity implications of epistemic bounds and developing practical demonstrations of the Horizon of Indistinguishability.

            <br /><br />

            View the ENI6MA-Gated Crypto Utilities & Entropy System, under 'Projects', for more.
        `,
        tags: "Proofs • Logic • Philosophy",
        date: "November 2025 - Today",
        gradient: "conic-gradient(from 0deg, #ff0000 0deg, #ffff00 90deg, #00ff00 180deg,rgb(86, 71, 255) 270deg, #ff0000 360deg)"
    },
    {
        id: "hybrid-esn-enkf",
        title: "Hybrid ESN + EnKF for Lorenz-96 State Estimation",
        summary: "Supervised Undergarduate Capstone: A novel approach on state estimation combining reservoir computing and data assimilation...",
        description: `
        A supervised capstone research project, being a novel approach on state estimation using knowledge on Hybrid
        ESNs (Echo State Networks) and 
        EnKF (Ensemble Kalman Filtering). 
        We train model on noisy samples of the Multiscale Lorenz 96 system, generated by applying a Gaussian noise on the RK4 solver.
        <br /><br />
        
        The Multi-Scale Lorenz-96 describes atmospheric convection and is widely used in ML research due to its simplicity and ability to capture fast and slow time dynamics. Our data was generated using RK-4 methods on an imperfect L-96 model:
            \\[
                \\frac{dX_{k}}{dt}=X_{k-1}(X_{k+1}-X_{k-2})-X_{k}+F-\\frac{hc}{b}\\sum_{j=1}^{J}Y_{j,k}
            \\]
            \\[
                \\frac{dy_{j,k}}{dt}=-cb \\cdot Y_{j+1,k}(Y_{j+2,k}-Y_{k-1,k})-cY_{j,k}+\\frac{hc}{b}X_{k}

            \\]

            <br />

            After data generation, we applied various samples of Gaussian noise and tested models to see which would output the lowest Normalized Root Mean-Squared Error (NRMSE). The models we tested on were an Imperfect Model, an Imperfect model with an EnKF, an Echo State Network, and an ESN with an EnKF. More work is to be done on implementing a Hybrid-ESN, and one with an EnKF.

            <br /><br />
            More information, literature, and results are visible at 
            <a href="https://github.com/mcvlix/lorenz-96-hybrid-esn/" 
               title="Github Repository"
               style="text-decoration: underline; color: #306eff;"
                target="_blank" 
               rel="noopener noreferrer">
            this Github Repository</a>.

            `,
        tags: "ML Research • Reservoir Computing • PDEs",
        date: "April - June 2025",
        gradient: "linear-gradient(to right, #ff3a30, #306eff)"
    },
];

/* Template for new publication:
{
    title: "",
    summary: "",
    description: `
        
    `,
    tags: "",
    date: "",
    gradient: ""
},
*/


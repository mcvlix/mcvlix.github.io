export const blogs = [
        {
        id: "language-group-theory",
        title: "The Group Theory Behind Language Construction",
        summary: "The formal definition for algebraic structures, alphabets, and language construction under the RWPs...",
        description: `
            An <b>Alphabet</b> \\((\\Sigma)\\) is simply a set of <b>symbols</b>.

            $$\\Sigma=\\{a,b,c\\}\\Leftrightarrow a \\in \\Sigma$$

            A <b>Word</b> \\((w)\\) in our sense is a finite sequence of symbols from our alphabet.

            $$w=ababc$$

            A <b>Language</b> \\((L)\\) is a set of words.

            $$L=\\{ab,ababc,cba,...\\}$$

            If we denote \\((\\Sigma^n)\\) to be <b>the set of all possible sequences of length</b> \\(n\\), we can also express words and languages to be elements and subsets of this sequence list:

            $$w\\in \\Sigma^*{;L\\subseteq\\Sigma^*}$$

            Where:

            $$\\Sigma^{*}=\\bigcup_{n=0}^\\infty\\Sigma^n\\text{, the set of all possible sequences constructed from }\\Sigma.$$

            If we view <b>concatenation</b> \\((\\cdot)\\), the process of appending two elements into a string as an operation, we can form an algebraic structure:

            $$(\\Sigma^*,\\cdot)\\text{ is a monoid.}$$

            A <a href="https://en.wikipedia.org/wiki/Monoid" title="Monoid" style="text-decoration: underline; color: var(--color-link);" target="_blank" rel="noopener noreferrer">monoid</a> is a semigroup, meaning it has an identity \\((\\epsilon)\\) and an associative binary operation:

            $$(a\\cdot b)\\cdot c=a\\cdot (b\\cdot c)=abc$$

            <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.2); margin: var(--spacing-lg) 0;" />

            <b>RWP encryption</b> requires multiple alphabets, which are entirely disjoint. Consider two alphabets with no shared members, other than the empty word: $$\\Sigma_{1}=\\{a,b,c\\};\\Sigma_{2}=\\{1,2,3\\}$$

            We can form the lemma that the set of all words formed from entirely disjoint alphabets are also disjoint:

            $$\\forall i\\neq j:$$

            $$\\Sigma_{i}\\cap\\Sigma _j=\\emptyset\\implies\\Sigma_i^*\\cap\\Sigma_j^*=\\emptyset$$

            In other words, if two alphabets do not contain any of the same element, the sets of words they generate also do not contain any of the same element.

            Back to <b>singular alphabets</b>:

            This lemma allows us to properly form <b>word tuples</b> (secrets). Consider \\((\\mathcal{W})\\), the set of all words constructable from a singular alphabet. We can then formalize \\(\\mathcal{W}^n\\), the set of all possible words of length \\(n\\): 

            $$\\mathcal{W}=\\bigcup_{i\\in I}\\Sigma_i^*$$

            $$\\mathcal{W}^n=\\{(w_1,...,w_n)|w_k\\in\\mathcal{W}\\}\\text{, where }w_{n}\\text{ is word }{n}{\\text{ of our sequence.}}$$

            By each word to come from a different alphabet, each tuple can have a <b>mixed structure sequence</b>: 

            $$(w_1\\in\\Sigma_{i_1}^{*},w_2\\in\\Sigma_{i_2}^{*},...,w_n\\in\\Sigma_{i_n}^{*})$$

            $$\\mathcal{W}^n=\\bigcup_{i_1,...i_n\\in{I}}(\\Sigma_{i_1}^*\\times\\Sigma_{i_2}^*\\times...\\times\\Sigma_{i_n}^*)$$

            Where \\(i_n\\) is the alphabet's index, \\(\\Sigma^*_{i_n}\\) is the set of words that \\(w_n\\) may be drawn from, and each \\(w_n\\) can be of arbitrary length.

            Now, each tuple is drawn from a <b>completely non-overlapping (disjoint) domain</b>. This is an essential property in ensuring <b>unambiguous composition</b>: the membership of each element in this tuple uniquely reveals its source alphabet completely.
        `,
        tags: "Cryptography • Information Theory • Group Theory",
        date: "December 2025",
        gradient: "conic-gradient(from 0deg, #ff0000 0deg, #ffff00 90deg, #00ff00 180deg,rgb(86, 71, 255) 270deg, #ff0000 360deg)"
    },
    {
        id: "rosario-wang-cypher",
        title: "The Rosario-Wang Cypher",
        summary: "Mathematically proven security, quantum entropy, and the human mind as a key...",
        description: `
            A valid user holds a secret (set of strings/passwords), and a private bijective map. Similar to how the brain can create abstract assocations (i.e., friends with movie characters, blue with mathematics), the bijective map is a clever encoding. For the simple cypher, we use the six cardinal directions in 3D (up, down, left, right, forward, backward) and six colors (red, green, blue, yellow, black, white). 

            <br /><br />

            Simple enough, right? This is actually enough to create a statistically uniform, quantum-proof, cryptographic system. Refer to the
                <a href="https://circuit.eni6ma.io/"
                title="ENI6MA Circuit Interface"
                style="text-decoration: underline;"
                target="_blank"
                rel="noopener noreferrer">
                circuit demonstration</a> for this cypher.
                
               The user searches for the first character of any secret, and finds what ring it lies within, and the color of the leaf it lies on. Their input is then transformed by the private bijection, meaning the user inputs the encrypted cardinal direction that corresponds to the character. The rings spin and the user repeats. Once the user iterates through the circuit and fully inputted a valid secret, they are allowed into the system.
               
               <br /><br />

                               <a href="https://setup.eni6ma.io/"
                title="ENI6MA Circuit Interface"
                style="text-decoration: underline;"
                target="_blank"
                rel="noopener noreferrer">
                This setup demonstration</a> shows how a user may create their own secrets and private bijection. Mathematically, this information is sufficient for an attacker to have no advantage over the user. This is a key finding of the


                <a href="https://www.eni6ma.io/documentation/gitbook/the-eni6ma-cypher-rosario-wang-proof/overview-of-rosario-wang-proof.md"
                title="ENI6MA Circuit Interface"
                style="text-decoration: underline;"
                target="_blank"
                rel="noopener noreferrer">
                Rosario-Wang Proof</a>, as the information is stored in a higher-dimensional space that cannot be deterministically derived from simply observing the user's inputs.
        `,
        tags: "Cryptography • Information Theory • Research",
        date: "October 2025 - Today",
        gradient: "conic-gradient(from 0deg, #ff0000 0deg, #ffff00 90deg, #00ff00 180deg,rgb(86, 71, 255) 270deg, #ff0000 360deg)"
    },


//     {
//         title: "Information Theory Intro",
//         summary: "A preview of the key concepts and theorems in information theory...",
//         type: "md",
//         description: `# Elements of Information Theory - Chapter 1: Introduction & Preview

// **Summary based on Thomas M. Cover & Joy A. Thomas**

// ## 1. Introduction
// Information theory answers two fundamental questions in communication theory:
// 1.  **What is the ultimate data compression?** (The limit is the **Entropy** $H$).
// 2.  **What is the ultimate transmission rate of communication?** (The limit is the **Channel Capacity** $C$).

// Proposed by **Claude Shannon** in his 1948 landmark paper "A Mathematical Theory of Communication," this theory defines rigorous mathematical limits on communication, independent of the technologies used.

// ---

// ## 2. The Communication System Model

// Information theory models all communication systems with a unified block diagram:
// $$ \\mathrm{Source} \\to \\text{Encoder} \\to \\text{Channel} \\to \\text{Decoder} \\to \\text{Destination} $$

// *   **Source**: Produces the message $W$.
// *   **Encoder**: Maps $W$ to a signal $X^n$ suitable for the channel.
// *   **Channel**: Adds noise, mapping $X^n \\to Y^n$ according to a conditional probability distribution $p(y|x)$.
// *   **Decoder**: Estimates the message $\\hat{W}$ from $Y^n$.
// *   **Goal**: To make the probability of error $P(\\hat{W} \\neq W)$ arbitrarily small.

// ---

// ## 3. Fundamental Measures of Information

// Chapter 1 previews the key quantities that quantify "information."

// ### 3.1 Entropy ($H$)
// Entropy is a measure of the **uncertainty** of a single random variable.
// *   Let $X$ be a discrete random variable with probability mass function $p(x)$.
// *   **Definition**: $H(X) = - \\sum_{x \\in \\mathcal{X}} p(x) \\log p(x)$.
// *   **Interpretation**: The average number of bits required to describe the random variable $X$.
// *   **Properties**:
//     *   $H(X) \\ge 0$.
//     *   $H(X)$ is maximized when $p(x)$ is uniform.

// ### 3.2 Mutual Information ($I$)
// Mutual information measures the amount of information one random variable contains about another.
// *   **Definition**: $I(X; Y) = \\sum_{x,y} p(x,y) \\log \\frac{p(x,y)}{p(x)p(y)}$.
// *   **Relationship to Entropy**: $I(X; Y) = H(X) - H(X|Y)$.
// *   **Interpretation**: The reduction in the uncertainty of $X$ due to the knowledge of $Y$.

// ### 3.3 Relative Entropy (Kullback-Leibler Divergence) ($D$)
// A measure of the "distance" between two probability distributions $p$ and $q$.
// *   **Definition**: $D(p || q) = \\sum_x p(x) \\log \\frac{p(x)}{q(x)}$.
// *   **Interpretation**: The inefficiency of assuming the distribution is $q$ when the true distribution is $p$.
// *   **Note**: It is not a true metric (not symmetric, doesn't satisfy triangle inequality).

// ---

// ## 4. Fundamental Theorems (Previews)

// ### 4.1 The Asymptotic Equipartition Property (AEP)
// The AEP is the "Law of Large Numbers" for information.
// *   For a sequence of i.i.d. random variables $X_1, X_2, \\dots, X_n$:
//     $$ -\\frac{1}{n} \\log p(X_1, \\dots, X_n) \\to H(X) $$
// *   **Consequence**: The set of all possible sequences can be divided into two sets:
//     1.  **Typical Set**: Contains almost all the probability, has size $\\approx 2^{nH(X)}$.
//     2.  **Atypical Set**: Has negligible probability.

// ### 4.2 Data Compression (Source Coding Theorem)
// We can compress the output of a source with entropy $H(X)$ into a rate $R$ bits per symbol.
// *   **Theorem**:
//     *   If $R > H(X)$, reliable compression is possible.
//     *   If $R < H(X)$, reliable compression is impossible without information loss.
// *   **Intuition**: We assign short descriptions to frequent events and long descriptions to rare events.

// ### 4.3 Channel Capacity (Channel Coding Theorem)
// We can transmit data over a noisy channel with capacity $C$.
// *   **Definition of Capacity**: $C = \\max_{p(x)} I(X; Y)$.
// *   **Theorem**:
//     *   If Rate $R < C$, there exists a code such that the probability of error $\\to 0$ as $n \\to \\infty$.
//     *   If Rate $R > C$, the probability of error is bounded away from zero.
// *   **Significance**: Noise does not set a limit on *accuracy*, only on the *rate* of communication. We can correct errors perfectly as long as we transmit below capacity.

// ---

// ## 5. Connections to Other Fields

// ### 5.1 Physics (Thermodynamics)
// *   **Second Law**: Entropy of an isolated system increases.
// *   **Maxwell's Demon**: A thought experiment where a demon decreases entropy by sorting molecules. The resolution involves the cost of information processing (erasing the demon's memory increases entropy).

// ### 5.2 Computer Science (Kolmogorov Complexity)
// *   **Kolmogorov Complexity ($K(x)$)**: The length of the shortest computer program (in a universal language) that prints string $x$ and halts.
// *   **Relation**: $K(x) \\approx H(X)$ for random strings. Kolmogorov complexity is the ultimate form of data compression.

// ### 5.3 Statistics (Large Deviation Theory)
// *   Information theory provides bounds on the probability of rare events (large deviations) using relative entropy $D(p||q)$.
// *   It simplifies the analysis of hypothesis testing (Stein's Lemma).

// ### 5.4 Portfolio Theory (Gambling)
// *   **Doubling Rate**: The optimal growth rate of wealth in repeated gambling is related to entropy and mutual information.
// *   **Kelly Criterion**: Betting proportional to the probability of winning maximizes the expected log wealth.

// ---

// ## 6. Summary of Key Inequalities
// *   **Jensen's Inequality**: $E[f(X)] \\ge f(E[X])$ for convex functions.
// *   **Information Inequality**: $D(p || q) \\ge 0$.
// *   **Conditioning Reduces Entropy**: $H(X|Y) \\le H(X)$.

// ## 7. Conclusion
// Chapter 1 sets the stage for a unified mathematical theory that connects probability, statistics, computing, and communication through the concept of **Information Measures** ($H, I, D$). The core finding is that information can be treated as a physical quantity, subject to conservation laws and fundamental limits.

            
//         `,
//         tags: "Information Theory • Cryptography • Research",
//         date: "December 2025",
//         gradient: "radial-gradient(rgb(168, 175, 255), rgb(0, 0, 197))"
//     },
    {
        id: "what-am-i-studying",
        title: "What Am I Studying Now?",
        summary: "The textbooks, resources, courses, and projects I am working through...",
        description: `

            <b>CRYPTOGRAPHY:</b> <br /><br />

            • <a href="https://www.wiley.com/en-us/Elements+of+Information+Theory%2C+2nd+Edition-p-9780471241959" style="text-decoration: underline; color: #4dabf7;" target="_blank" rel="noopener noreferrer">Elements of Information Theory</a> - Thomas M. Cover, Joy A. Thomas           <br /> 
            • <a href="https://dl.acm.org/doi/10.1145/1568318.1568324" style="text-decoration: underline; color: #4dabf7;" target="_blank" rel="noopener noreferrer">On Lattices, Learning with Errors, Random Linear Codes, and Cryptography</a> - Oded Regev <br /><br /> 


            <b>GENERAL APPLIED MATHEMATICS:</b> <br /><br />
            
            • <a href="https://epubs.siam.org/doi/book/10.1137/1.9781611977165" style="text-decoration: underline; color: #4dabf7;" target="_blank" rel="noopener noreferrer">Numerical Linear Algebra</a> - Lloyd N. Trefethen, David Bau III <br />
            • <a href="https://shop.elsevier.com/books/programming-massively-parallel-processors/hwu/978-0-323-93654-4" style="text-decoration: underline; color: #4dabf7;" target="_blank" rel="noopener noreferrer">Programming Massively Parallel Processors</a> - David B. Kirk, Wen-mei W. Hwu          <br /> 
            • <a href="https://www.wiley.com/en-us/Advances+in+Financial+Machine+Learning-p-9781119482086" style="text-decoration: underline; color: #4dabf7;" target="_blank" rel="noopener noreferrer">Advances in Financial Machine Learning</a> - Marcos López de Prado                     <br />
            • <a href="https://link.springer.com/book/10.1007/978-0-387-22527-2" style="text-decoration: underline; color: #4dabf7;" target="_blank" rel="noopener noreferrer">Stochastic Calculus for Finance II: Continuous Time Models</a> - Steven E. Shreve      <br /><br />

            I would also like to draw attention to 
            <a href="https://www.youtube.com/channel/UCJgIbYl6C5no72a0NUAPcTA" 
               title="GPU MODE - A GPU reading group and community"
               style="text-decoration: underline; color: #76b900;"
               target="_blank" 
               rel="noopener noreferrer">
            GPU MODE</a>,
            an online reading group and community concerned with GPU (particularly CUDA) programming. While I have not directly contributed to this community, I am following their lectures as it is a very up-to-date and industry involved community.

        `,
        tags: "Informative • Resources • Books",
        date: "Today",
        gradient: "radial-gradient(#ffffff, #90d5ff)"
    },
    {
        id: "inline-cuda-pytorch",
        title: "Inline CUDA w/ PyTorch (WIP)",
        summary: "A tutorial on injecting CUDA into your own PyTorch program...",
        description: `
            Programming in CUDA can be very challenging, and the challenge begins with even running your first program on a local machine. However, there is no need to re-invent the wheel, especially if you have programming experience with PyTorch.<br /><br />
            
            Assuming your machine has a Windows 10/11 operating system, and an NVIDIA GPU To inject CUDA into your own PyTorch program: <br /><br />

            Install Python                                                                      <br />
            Install PyTorch with CUDA support for your GPU      <br />
            Download CUDA Toolkit from NVIDIA Developer (Depending on your GPU)     <br />
            Ensure proper paths exist <br />
            Install Visual Studio 2022 with MSVC v143 and Windows SDK 10+        <br />
            Install ninja compiler       <br />
            Create a Python virtual environment and activate it<br />
            Verify GPU is visible to pytorch<br />
            Define a CUDA Kernel using load_inline\

        `,
        tags: "Informative • Tutorial • CUDA • PyTorch",
        date: "September 2025",
        gradient: "linear-gradient(to left, #76b900, #76b900)"
    },
    {
        id: "investing-portfolio",
        title: "Takeaways from building an investing portfolio",
        summary: "My experience from managing a personal portfolio...",
        description: `
            <i>The younger you are, the more risk tolerance you have as you have more total time to invest.</i> This does not mean to purchase exclusively risky assets at a young age, but rather embrace the process of action-based learning when it is affordable. The purpose of this block is to retain transparency on my personal finances.
            
            <br /><br />

            My first personal portfolio was seeded as a custodial brokerage account, and gaining access to this fueled my curiosity. Working alongside a financial advisor, 
            we built a diversified mix of individual equities, ETFs, and mutual funds, with a tech-focused edge—stocks like NVIDIA corporation (NVDA), Berkshire Hathaway (BRK-B), and Eli Lilly (LLY) were key holdings. Not only was this a long-term investment in my wealth, but in my knowledge and openness to learning more.

            <br /><br />

            Over time, the portfolio grew significantly with a gain of (>422%) with the number of holdings ranging from 14 to 18, blowing away many standard benchmarks and reaching multiple six figures. While I have made many trades in this time, very little affected the portfolio's overall form (>10%). Therefore, this portfolio demonstrates the power of compounding as well as disciplined investment strategies.

            <br /><br />

            Here are some bits I have learned along the way:

            <br /><br />

            <ul style="margin-left: 20px;">
                <li>Invest in a <i>strong brokerage firm</i> and <i>smart financial advisor</i>. This relationship is needed for making informed decisions and avoiding costly mistakes early on.</li>
                <li><i>Active research and engagement trumps emotion-driven investments</i>, espcially with professional guidance.
                <a href="https://www.youtube.com/watch?v=8SbV1jN12RY" 
                    title="Every Bias Explained in 8 Minutes"
                    style="text-decoration: underline; color: #b0b0b0;"
                        target="_blank" 
                    rel="noopener noreferrer">
                            Here is a quick video</a> which describes cognitive biases that govern our decision making every single day.
                </li>
                <li><i>Your own knowledge is an asset</i> - a capital resource that can be leveraged for real-world outcomes. Specialized knowledge can add value to your work and differentiate you from others. This is exactly why I am focused on my academic route, rather than the investment portfolio itself.</li>
            </ul>

            <br />

            As I pursue deeper research, I am focused on leveraging my knowledge in applied math, GPU programming, and quantitative finance to develop skills that can be used across both academic and real-world challenges.
        `,
        tags: "Informative • Personal Finance • Equities • Investing",
        date: "October 2021 - Today",
        gradient: "radial-gradient(#009edc, #009edc)"
    },
];

/* Template for new blog:
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

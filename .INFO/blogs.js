export const blogs = [
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


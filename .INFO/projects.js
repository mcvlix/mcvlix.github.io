export const projects = [
    {
        id: "eni6ma-gated-crypto",
        title: "ENI6MA-Gated Crypto Utilities & Entropy System",
        summary: "Using the RWS to create a cryptographic system for protecting BTC and ETH transactions...",
        description: `BLOCK-SIG-ENI6MA is a secure, gated pathway for BTC and ETH transations, using an ENI6MA proof-of-knowledge system. Rather than using standard random number generation,
         we incorporate a human-interperable string derived from deterministic derivation from an embedded entropy pool of a set number of bits. 

         <br /><br />
         
         This system is designed as proof-of-concept for a more secure and transparent cryptographic system, and is currently being implemented in the ENI6MA lab.
         Core features include a generated 512-bit prime number, an encrypted entropy pool, and what is known as nonce generation, which creates deterministic challenges from entropy \\(\\epsilon\\), timestamp \\(\\tau\\) and prime \\(\\pi\\) for the user to prove their identity.
        <br /><br />

        The project is currently in the proof-of-concept stage, and we are constantly adding features for Bitcoin and Etherium integration, so users can safely store their cryptocurrecy wallets underneath Rosario-Wang proven mathematical barriers. 
        
        <br /><br />
        I plan to do my first demonstration in San Francisco, CA in early December.
         
            `,
        tags: "ENI6MA • Cryptography • Cryptocurrency • Research",
        date: "October 2025 - Today",
        gradient: "conic-gradient(from 0deg, #ff0000 0deg, #ffff00 90deg, #00ff00 180deg,rgb(86, 71, 255) 270deg, #ff0000 360deg)"
    },
    {
        id: "dinis-surface",
        title: "Dini's Surface Visualization",
        summary: `
            More on the animation in the background...
        `,
        description: `
            A JavaScript visualization of a parametric curve known as Dini's surface. 
            This render serves as an exercise to template future projects with the greater goal of visualizing theoretical concepts using OpenGL shading algorithms (GLSL). 
            
            The surface is defined as \\( f(u,v): \\mathbb{R}^2 \\rightarrow \\mathbb{R}^3 \\) with parameters \\(a\\) describing the radius and \\(b\\) describing the vertical scale:
            
            \\[
            x = a \\cos u \\sin v, \\quad 
            y = a \\sin u \\sin v, \\quad 
            z = a \\left( \\cos v + \\ln \\tan \\frac{v}{2} \\right) + b u
            \\]
            
            In this animation, \\(u\\) (upper bound for the surface integral) is time-animated using a sine function and \\(a\\) (radius) is animated similarly. 
            The 'web-like' look exists to portray the discretization of input values, as opposed to creating a smooth and opaque figure. The domain mesh is a simple, 100x100 plane.

            <br /><br />
            The color values of each point on the curve are produced as a function of both location on the base (pre-vertexed) 2-dimensional mesh and time.
            
            <br /><br />
            <a href="https://mathworld.wolfram.com/DinisSurface.html" 
               title="Dini's Surface - Wolfram MathWorld"
               style="text-decoration: underline; color: #e52e71;"
               target="_blank" 
               rel="noopener noreferrer">
            Here</a> is the Wolfram Mathworld article on Dini's Surface.
        `,
        tags: "Three.js • WebGL • Shaders",
        date: "June 2024",
        gradient: "linear-gradient(to left, #ff8a00, #e52e71)"
    },
    {
        id: "quantum-linear-systems",
        title: "Benchmarking a Quantum Linear Systems Algorithm (WCISCC 2025)",
        summary: "Tests on an IBM quantum circuit emulator that got 2nd in an HPC competition...",
        description: `
            In February of 2025, UCSC's Supercomputing Team (Not-So-Slow Slugs) participated in the

            <a href="https://www.winterclassicinvitational.com/" 
               title="2025 Winter Classic Invitational Student Cluster Competition
"
               style="text-decoration: underline; color: #ff6666;"
                target="_blank" 
               rel="noopener noreferrer">
            2025 Winter Cluster Invitational Supercomputing Competition</a> 
             (WCISCC 2025) hosted by Hewlett Packard Enterprise (HPE). The competition involved mentoring, compiling and testing HPC workloads on 5 different sponsored supercomputers, in which we placed 2nd out of 13 teams.
            <br /><br />

            While this was a first experience for me, it ended up being very lucrative. My most notable contribution was to Oak Ridge National Laboratory (ORNL)'s
            <a href="https://github.com/olcf/wciscc2025?tab=readme-ov-file" 
               title="2025 WINTER CLASSIC INVITATIONAL STUDENT CLUSTER COMPETITION ORNL CHALLENGE: "BENCHMARKING A QUANTUM LINEAR SYSTEMS ALGORITHM"
               style="text-decoration: underline; color: #ff6666;"
                target="_blank" 
               rel="noopener noreferrer">
            Quantum Challenge</a>.
            <br /><br />
            The goal of this challenge is to 'perform parametric study of a quantum linear systems algorithm (QLSA) on simulators, emulators, and real devices'. The challenge had 3 parts:
            <br /><br />
            <ul style="margin-left: 20px;">
                <li>A fidelity (accuracy) and UQ test on the QLSA simulator, both testing the number of shots and the size of the tridiagonal Toeplitz matrix problem.</li>
                <li>A backend evaluation, comparing the quasi-probability distribution on the simulator, emulator, and real quantum nodes.</li>
                <li>Solving the Hele-Shaw fluid flow problem on the quantum simulator, and plotting the resulting pressure and velocity profiles. Also including as another fidelity analysis.</li>
            </ul>
            
            <br />
            <a href="https://www.winterclassicinvitational.com/uc-santa-cruz-follow-up-interview/" 
               title="UC Santa Cruz Follow Up Interview"
               style="text-decoration: underline; color: #b0b0b0;"
                target="_blank" 
               rel="noopener noreferrer">
            Here</a> is an interview snippet from the competition, soon after completing this study.
            `,
        tags: "HPC • Competition • Quantum • UQ",
        date: "February - May 2025",
        gradient: "radial-gradient(#ff6666, #ff6666)"
    },
    {
        id: "resume-classifier",
        title: "Resume Classifier ML Model",
        summary: "Using Natural Language Processing to classify resumes with a corporate dataset...",
        description: `
            A formal ML project with a virtual team of 12 using a CNN (Convolutional Neural Network) to predict the role an applicant fits based on resume text. 
            A real, unbalanced dataset of 363 corporate resumes was uses, and performance was tested with our open-source project.
            Most of the codebase is created with scikit-learn. 
            
            <br /><br />
            The full, open-source project is visible at: 
            <a href="https://github.com/meanderson65/AISV.X400.ClassProject" 
               title="GPU MODE - A GPU reading group and community"
               style="text-decoration: underline; color: #305dff;"
                target="_blank" 
               rel="noopener noreferrer">
            this Github Repository</a>.
        `,
        tags: "Python • Natural Language Processing • CNNs",
        date: "December 2024",
        gradient: "linear-gradient(to left, #305dff, #5840f5)"
    },
];

/* Template for new project:
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


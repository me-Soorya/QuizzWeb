const quizData = [
    {
      question: "What is distributed computing?",
      options: [
        "Using one computer for multiple tasks",
        "Making multiple computers work together to solve a common problem",
        "Creating backup systems for a computer",
        "Using virtual machines on a single system"
      ],
      correct: 1
    },
    {
      question: "Which architecture allows each computer to share and receive data directly with others?",
      options: [
        "Client-server",
        "Grid computing",
        "Peer-to-peer",
        "Mainframe"
      ],
      correct: 2
    },
    {
      question: "Which company uses Bigtable, a distributed database, to power services like Maps and Analytics?",
      options: [
        "Amazon",
        "Microsoft",
        "Google",
        "IBM"
      ],
      correct: 2
    },
    {
      question: "What does a DDoS attack do?",
      options: [
        "Improves network performance",
        "Updates distributed software",
        "Floods a website with traffic to crash it",
        "Protects systems from hacking"
      ],
      correct: 2
    },
    {
      question: "What technology combines cryptographic hashing, distributed consensus, and P2P networks?",
      options: [
        "Cloud computing",
        "Blockchain",
        "Edge computing",
        "DDoS"
      ],
      correct: 1
    },
    {
      question: "What is one major advantage of distributed systems?",
      options: [
        "They are easy to hack",
        "They crash if one system fails",
        "They use only one central server",
        "They offer high scalability and availability"
      ],
      correct: 3
    },
    {
      question: "What does Azure Cloud support?",
      options: [
        "Only Microsoft internal services",
        "Offline gaming",
        "Smart infrastructure and enterprise tools",
        "Only cloud storage"
      ],
      correct: 2
    },
    {
      question: "What breakthrough did Mastercard's blockchain platform aim to achieve?",
      options: [
        "Creating cryptocurrency",
        "Eliminating banks",
        "Simplifying digital money transfers",
        "Replacing the stock market"
      ],
      correct: 2
    },
    {
      question: "Which technology brings data processing closer to the source?",
      options: [
        "Cloud computing",
        "Edge computing",
        "Quantum computing",
        "Cryptojacking"
      ],
      correct: 1
    },
    {
      question: "What is the purpose of Grid Computing?",
      options: [
        "Powering mobile apps",
        "Connecting devices in a single office",
        "Teaming up computers globally to solve complex problems",
        "Tracking online activity"
      ],
      correct: 2
    }
  ];
  
  
  let currentQuestion = 0;
  let score = 0;
  
  const correctMemes = [
    "https://i.pinimg.com/736x/d5/77/2d/d5772d5afdab9c7bc330aeb22c86a9fd.jpg", // Correct meme 1
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKmaaldqkGZrEwtX_yM_APV-m7hXEodkktkA&s" , // Correct meme 2
    "https://i.imgflip.com/6vs376.jpg",
    "https://i.pinimg.com/474x/76/66/a5/7666a558fd4a00869c8ee3e1148f38df.jpg",
    "https://imgix.ranker.com/user_node_img/50147/1002926623/original/1002926623-photo-u1034004088?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=355"
  ];
  
  const wrongMemes = [
    "https://blog-cdn.engagebay.com/blog/wp-content/uploads/2023/09/Hedgehog-motivation-jpg.jpg", // Wrong meme 1
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtFe7X0ceDPVYPYI5sf43Z_SExiii4NRst5g&s",  // Wrong meme 2
    "https://i.pinimg.com/236x/87/34/95/873495840e1c3e92459e99eb7c421105.jpg",
    "https://i.imgflip.com/6vs376.jpg"
  ];
  
  function loadQuestion() {
    const q = quizData[currentQuestion];
    document.getElementById("question").innerText = q.question;
    document.getElementById("progress").innerText = `Question ${currentQuestion + 1} of ${quizData.length}`;
  
    q.options.forEach((opt, i) => {
      const btn = document.getElementById(`opt${i}`);
      btn.innerText = opt;
      btn.className = "option";
      btn.disabled = false;
    });
  }
  
  function selectOption(index) {
    const q = quizData[currentQuestion];
    const correct = q.correct;
  
    // Disable all options after selection
    for (let i = 0; i < 4; i++) {
      const btn = document.getElementById(`opt${i}`);
      btn.disabled = true;
      btn.classList.remove("correct", "wrong");
    }
  
    const selectedBtn = document.getElementById(`opt${index}`);
    
    // Create meme and display it in the top-right corner
    const feedbackContainer = document.getElementById('feedback-container');
    const memeImage = document.createElement("img");
    memeImage.classList.add("meme");
  
    if (index === correct) {
      selectedBtn.classList.add("correct");
      memeImage.src = correctMemes[Math.floor(Math.random() * correctMemes.length)];
      score++;
    } else {
      selectedBtn.classList.add("wrong");
      document.getElementById(`opt${correct}`).classList.add("correct");
      memeImage.src = wrongMemes[Math.floor(Math.random() * wrongMemes.length)];
    }
  
    feedbackContainer.appendChild(memeImage);
  
    setTimeout(() => {
      memeImage.remove(); // Remove meme after 2 seconds
    }, 2000);
  
    // Move to the next question after 1.5 seconds
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        loadQuestion();
      } else {
        document.querySelector(".quiz-container").innerHTML = `
          <h2>Well done!</h2>
          <p>You scored ${score} out of ${quizData.length}.</p>
          <button onclick="restartQuiz()" class="option" style="width: 100%; margin-top: 20px;">Restart</button>
        `;
      }
    }, 1500);
  }
  
  function restartQuiz() {
    location.reload();
  }
  
  loadQuestion();
  
const router = require("express").Router();
const { Quiz, Answers } = require("../models/Quiz.js");

//Insert
router.route("/add").post((req, res) => {
  const question = req.body.question;
  const category = req.body.category;
  const answertype = req.body.answertype;
  const inputValues = req.body.inputValues;

  const newQuestion = new Quiz({
    question,
    category,
    answertype,
  });

  newQuestion
    .save()
    .then((question) => {
      const answers = inputValues.map((inputValue) => {
        return {
          answer: inputValue.point,
          score: inputValue.value,
        };
      });

      const newAnswers = new Answers({
        question_id: question._id,
        answers: answers.map((answer) => answer.answer),
        score: answers.map((answer) => answer.score),
      });

      return newAnswers.save();
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("quiz-participat/", async (req, res) => {
  try {
    const questions = await Question.find();
    const questionsWithAnswers = await Promise.all(
      questions.map(async (question) => {
        const answers = await Answers.find({ question_id: question._id });
        return { ...question.toObject(), answers };
      })
    );
    res.json(questionsWithAnswers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//Select
router.route("/answers/").get((req, res) => {
  Answers.find()
    .populate("question_id")
    .then((quiz) => {
      res.json(quiz);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/answersParticipate/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const answers = await Answers.find({ question_id: id });
    res.status(200).json(answers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.route("/answers/:quizId").get((req, res) => {
    const quizId = req.params.quizId;
    Answers.findOne({ question_id: quizId })
      .then((answers) => {
        res.json(answers.answers);
      })
      .catch((err) => {
        console.log(err);
      });
  });
router.route("/").get((req, res) => {
  Quiz.find() 
    .then((quiz) => {
      res.json(quiz);
    })
    .catch((err) => {
      console.log(err);
    });
});
   
    //Update
    router.route("/edit/:id").put(async (req, res) => {
      const quizId = req.params.id;
      const { question, category, answertype } = req.body;
      const updateQuiz = { question, category, answertype }; // exclude _id field
    
      try {
        await Quiz.findByIdAndUpdate(quizId, updateQuiz);
        res.status(200).send({ status: "Question Updated" });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          status: "Error With Updating Data",
          error: error.message,
        });
      }
    });
    //Delete
router.route("/delete/:id").delete(async(req, res) => {
    let quizId = req.params.id;
    await Quiz.findByIdAndDelete(quizId)
        .then(() => {
            res.status(200).send({
                status: "Question Deleted"
            });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({
                status: "Error With Delete Question",
                error: err.message
            });
        })

})
router.route("/get/:id").get(async(req, res) => {
    let quizId = req.params.id;
    await Quiz.findById(quizId)
    .then((quiz) => {
        res.json(quiz);
      }).catch(() => {
            console.log(err, message);
            res.status(500).send({
                status: "Error with get Question",
                error: err.message
            })
        })
})
module.exports = router;
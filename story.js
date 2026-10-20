
/* ==========================================
   BEFORE YOU CLOSE YOUR EYES
   STORY.JS - FIVE CHAPTER EDITION
========================================== */

window.STORY = {
  title: "Before You Close Your Eyes",

  subtitle:
    "Some people disappear from the world. " +
    "Others disappear only from our memories.",

  start: "ch1_intro",

  chapters: [
    {
      title: "Chapter 1 — The Girl on the Rooftop",
      description: "An unexpected meeting beneath the evening sky.",
      scene: "ch1_intro"
    },
    {
      title: "Chapter 2 — The Empty Seat",
      description: "The world begins forgetting someone important.",
      scene: "ch2_intro"
    },
    {
      title: "Chapter 3 — The Last Train",
      description: "A fragile promise at the edge of sunset.",
      scene: "ch3_intro"
    },
    {
      title: "Chapter 4 — Between Dreams",
      description: "The truth waiting on the other side of sleep.",
      scene: "ch4_intro"
    },
    {
      title: "Chapter 5 — Before You Close Your Eyes",
      description: "One final choice before morning arrives.",
      scene: "ch5_intro"
    }
  ],

  scenes: {

    // ======================================
    // CHAPTER 1 — THE GIRL ON THE ROOFTOP
    // ======================================

    ch1_intro: {
      chapter: "Chapter 1 — The Girl on the Rooftop",
      chapterIntro: true,
      introSubtitle: "Every story begins with someone unexpected.",
      background: "rooftop",
      text:
        "The final bell had rung an hour ago. " +
        "Yet someone was still standing on the school rooftop.",
      next: "ch1_haru"
    },

    ch1_haru: {
      background: "rooftop",
      speaker: "haru",
      expression: "neutral",
      text:
        "I thought this place would be empty. " +
        "Guess I wasn't the only one avoiding the trip home.",
      next: "ch1_ria"
    },

    ch1_ria: {
      background: "rooftop",
      speaker: "ria",
      expression: "neutral",
      text:
        "You're staring. Is there something on my face, " +
        "or are you just naturally this awkward?",
      next: "ch1_reply"
    },

    ch1_reply: {
      background: "rooftop",
      speaker: "haru",
      expression: "shy",
      text:
        "Neither. I just... don't remember seeing you around school.",
      next: "ch1_tease"
    },

    ch1_tease: {
      background: "rooftop",
      speaker: "ria",
      expression: "happy",
      text:
        "Then maybe you haven't been paying attention. " +
        "I'm Ria, by the way.",
      next: "ch1_choice"
    },

    ch1_choice: {
      background: "rooftop",
      text:
        "The wind lifts the ends of her hair. " +
        "For some reason, the moment feels important.",
      choices: [
        {
          text: "Tell Ria your name and stay with her.",
          next: "ch1_stay"
        },
        {
          text: "Ask why she's alone on the rooftop.",
          next: "ch1_ask"
        }
      ]
    },

    ch1_stay: {
      background: "rooftop",
      speaker: "haru",
      expression: "happy",
      text:
        "I'm Haru. And I don't mind staying a little longer, " +
        "if you don't.",
      next: "ch1_soft"
    },

    ch1_ask: {
      background: "rooftop",
      speaker: "haru",
      expression: "neutral",
      text:
        "Why are you up here alone? " +
        "Waiting for someone?",
      next: "ch1_soft"
    },

    ch1_soft: {
      background: "rooftop",
      speaker: "ria",
      expression: "shy",
      text:
        "Maybe. Or maybe I was hoping someone would " +
        "notice that I was here.",
      next: "ch1_end"
    },

    ch1_end: {
      background: "rooftop",
      text:
        "That evening, Haru walked home with a girl's name " +
        "written on the last page of his notebook.\n\nRia.",
      next: "ch2_intro"
    },

    // ======================================
    // CHAPTER 2 — THE EMPTY SEAT
    // ======================================

    ch2_intro: {
      chapter: "Chapter 2 — The Empty Seat",
      chapterIntro: true,
      introSubtitle: "What happens when the world stops remembering?",
      background: "classroom",
      text:
        "The next morning, sunlight filled the classroom. " +
        "But something felt terribly wrong.",
      next: "ch2_seat"
    },

    ch2_seat: {
      background: "classroom",
      speaker: "haru",
      expression: "neutral",
      text:
        "Ria's desk is empty. " +
        "Maybe she's just late.",
      next: "ch2_class"
    },

    ch2_class: {
      background: "classroom",
      text:
        "When Haru asked his classmates about Ria, " +
        "none of them recognized her name.\n\n" +
        "Even the attendance sheet had no record of her.",
      next: "ch2_haru"
    },

    ch2_haru: {
      background: "classroom",
      speaker: "haru",
      expression: "angry",
      text:
        "That's impossible. I spoke to her yesterday. " +
        "I know I did.",
      next: "ch2_ria"
    },

    ch2_ria: {
      background: "classroom",
      speaker: "ria",
      expression: "sad",
      text:
        "You still remember me?",
      next: "ch2_reveal"
    },

    ch2_reveal: {
      background: "classroom",
      text:
        "Ria is standing beside the window.\n\n" +
        "Students pass her without looking up, " +
        "as though she is made of air.",
      next: "ch2_choice"
    },

    ch2_choice: {
      background: "classroom",
      speaker: "ria",
      expression: "sad",
      text:
        "I think I'm disappearing, Haru. " +
        "And I don't know how to stop it.",
      choices: [
        {
          text: "Promise you'll write down everything about her.",
          next: "ch2_notes"
        },
        {
          text: "Tell her you don't need proof to remember her.",
          next: "ch2_promise"
        }
      ]
    },

    ch2_notes: {
      background: "classroom",
      speaker: "haru",
      expression: "neutral",
      text:
        "Then I'll write everything down. " +
        "Your name, your voice, the way you tease me. Everything.",
      next: "ch2_response"
    },

    ch2_promise: {
      background: "classroom",
      speaker: "haru",
      expression: "happy",
      text:
        "I don't need an attendance sheet to know you're real. " +
        "You're standing right here.",
      next: "ch2_response"
    },

    ch2_response: {
      background: "classroom",
      speaker: "ria",
      expression: "shy",
      text:
        "You really are strange. " +
        "But... I'm glad it's you.",
      next: "ch2_end"
    },

    ch2_end: {
      background: "classroom",
      text:
        "At the bottom of a notebook page, " +
        "Haru writes a single sentence.\n\n" +
        "\"Tomorrow, I will remember Ria.\"",
      next: "ch3_intro"
    },

    // ======================================
    // CHAPTER 3 — THE LAST TRAIN
    // ======================================

    ch3_intro: {
      chapter: "Chapter 3 — The Last Train",
      chapterIntro: true,
      introSubtitle: "Some promises are made between departures.",
      background: "station",
      text:
        "Days pass. The city slowly forgets Ria's existence.\n\n" +
        "Only Haru continues to see her.",
      next: "ch3_wait"
    },

    ch3_wait: {
      background: "station",
      speaker: "ria",
      expression: "neutral",
      text:
        "Have you ever wondered where trains go " +
        "after the last passenger gets off?",
      next: "ch3_haru"
    },

    ch3_haru: {
      background: "station",
      speaker: "haru",
      expression: "happy",
      text:
        "Probably somewhere less depressing " +
        "than this conversation.",
      next: "ch3_laugh"
    },

    ch3_laugh: {
      background: "station",
      speaker: "ria",
      expression: "happy",
      text:
        "There it is. That terrible sense of humor. " +
        "I almost forgot how much I liked it.",
      next: "ch3_confession"
    },

    ch3_confession: {
      background: "station",
      speaker: "ria",
      expression: "sad",
      text:
        "Haru... if one day you wake up and can't remember " +
        "my face, would you still try to find me?",
      next: "ch3_choice"
    },

    ch3_choice: {
      background: "station",
      text:
        "The announcement for the last train echoes " +
        "through the station. Ria waits for your answer.",
      choices: [
        {
          text: "I would search every place we've been.",
          next: "ch3_search"
        },
        {
          text: "I'd stay beside you for as long as I could.",
          next: "ch3_stay"
        }
      ]
    },

    ch3_search: {
      background: "station",
      speaker: "haru",
      expression: "neutral",
      text:
        "Even if I forgot your face, I'd follow every clue. " +
        "I would find you again.",
      next: "ch3_response"
    },

    ch3_stay: {
      background: "station",
      speaker: "haru",
      expression: "shy",
      text:
        "Then I won't waste the time we have. " +
        "I'll stay with you until the very last moment.",
      next: "ch3_response"
    },

    ch3_response: {
      background: "station",
      speaker: "ria",
      expression: "shy",
      text:
        "You make impossible things sound so easy.\n\n" +
        "That's a dangerous habit, you know.",
      next: "ch3_end"
    },

    ch3_end: {
      background: "station",
      text:
        "The train arrives, but neither of them boards.\n\n" +
        "As its lights disappear into the distance, " +
        "Ria reaches for Haru's hand.",
      next: "ch4_intro"
    },

    // ======================================
    // CHAPTER 4 — BETWEEN DREAMS
    // ======================================

    ch4_intro: {
      chapter: "Chapter 4 — Between Dreams",
      chapterIntro: true,
      introSubtitle: "Beyond the waking world, memories have voices.",
      background: "shore",
      text:
        "That night, Haru dreams of a shoreline beneath " +
        "an endless violet sky.",
      next: "ch4_waves"
    },

    ch4_waves: {
      background: "shore",
      text:
        "The sea is motionless. Countless distant stars " +
        "reflect on the water.\n\n" +
        "Someone is waiting where the waves should break.",
      next: "ch4_ria"
    },

    ch4_ria: {
      background: "shore",
      speaker: "ria",
      expression: "neutral",
      text:
        "You found me. I was afraid you wouldn't.",
      next: "ch4_question"
    },

    ch4_question: {
      background: "shore",
      speaker: "haru",
      expression: "sad",
      text:
        "Ria, what is this place? " +
        "Why does it feel like I've been here before?",
      next: "ch4_truth"
    },

    ch4_truth: {
      background: "shore",
      speaker: "ria",
      expression: "sad",
      text:
        "It's where forgotten things go.\n\n" +
        "Memories, promises... sometimes people.",
      next: "ch4_explain"
    },

    ch4_explain: {
      background: "shore",
      speaker: "ria",
      expression: "sad",
      text:
        "Every morning, the world takes another piece of me. " +
        "When the last piece disappears, I won't be able " +
        "to reach you anymore.",
      next: "ch4_choice"
    },

    ch4_choice: {
      background: "shore",
      text:
        "Ria looks toward the silent ocean. " +
        "For the first time, she seems too frightened to speak.",
      choices: [
        {
          text: "Hold her hand and promise to fight.",
          next: "ch4_fight"
        },
        {
          text: "Tell her that being afraid is okay.",
          next: "ch4_comfort"
        }
      ]
    },

    ch4_fight: {
      background: "shore",
      speaker: "haru",
      expression: "angry",
      text:
        "Then I won't let the world decide for us. " +
        "There has to be a way to bring you back.",
      next: "ch4_response"
    },

    ch4_comfort: {
      background: "shore",
      speaker: "haru",
      expression: "shy",
      text:
        "You don't have to be brave every second. " +
        "If you're scared, we can be scared together.",
      next: "ch4_response"
    },

    ch4_response: {
      background: "shore",
      speaker: "ria",
      expression: "shy",
      text:
        "Haru... I wish we'd met sooner.",
      next: "ch4_end"
    },

    ch4_end: {
      background: "shore",
      text:
        "A pale light appears beyond the sea.\n\n" +
        "Morning is coming. The dream begins to unravel.",
      next: "ch5_intro"
    },

    // ======================================
    // CHAPTER 5 — BEFORE YOU CLOSE YOUR EYES
    // ======================================

    ch5_intro: {
      chapter: "Chapter 5 — Before You Close Your Eyes",
      chapterIntro: true,
      introSubtitle: "The morning always comes, even when we aren't ready.",
      background: "rooftop",
      text:
        "Haru wakes before sunrise.\n\n" +
        "His notebook is open beside him, but " +
        "some of the words have begun to fade.",
      next: "ch5_rooftop"
    },

    ch5_rooftop: {
      background: "rooftop",
      speaker: "haru",
      expression: "sad",
      text:
        "Ria... Please still be there.",
      next: "ch5_appears"
    },

    ch5_appears: {
      background: "rooftop",
      text:
        "He races to the rooftop.\n\n" +
        "Ria stands by the railing, almost transparent " +
        "in the early morning light.",
      next: "ch5_ria"
    },

    ch5_ria: {
      background: "rooftop",
      speaker: "ria",
      expression: "sad",
      text:
        "You came.\n\n" +
        "I wanted to say goodbye before you forgot me.",
      next: "ch5_haru"
    },

    ch5_haru: {
      background: "rooftop",
      speaker: "haru",
      expression: "angry",
      text:
        "Stop deciding that this is goodbye. " +
        "I'm still here. You're still here.",
      next: "ch5_last"
    },

    ch5_last: {
      background: "rooftop",
      speaker: "ria",
      expression: "shy",
      text:
        "Then promise me one thing.\n\n" +
        "Whatever happens next, don't close your heart " +
        "just because it hurts.",
      next: "ch5_choice"
    },

    ch5_choice: {
      background: "rooftop",
      text:
        "The first ray of sunlight crosses the rooftop.\n\n" +
        "You have only a moment left to decide what to do.",
      choices: [
        {
          text: "Reach for Ria. Refuse to let her disappear.",
          next: "hope_1"
        },
        {
          text: "Accept her goodbye and promise to remember.",
          next: "bittersweet_1"
        }
      ]
    },

    // ======================================
    // ENDING ONE — THE PROMISE OF TOMORROW
    // ======================================

    hope_1: {
      background: "rooftop",
      speaker: "haru",
      expression: "happy",
      text:
        "If the world forgets you, I'll remind it.\n\n" +
        "And if I forget you, I'll find a way " +
        "to fall in love with you again.",
      next: "hope_2"
    },

    hope_2: {
      background: "rooftop",
      speaker: "ria",
      expression: "shy",
      text:
        "That might be the most ridiculous promise " +
        "anyone has ever made to me.\n\n" +
        "It's also my favorite.",
      next: "hope_3"
    },

    hope_3: {
      background: "classroom",
      text:
        "Weeks later, a girl appears at the classroom door.\n\n" +
        "No one recognizes her.\n\n" +
        "Except for a boy who has been saving " +
        "the seat beside him.",
      next: "hope_ending"
    },

    hope_ending: {
      background: "classroom",
      speaker: "ria",
      expression: "happy",
      text:
        "\"Is this seat taken?\"\n\n" +
        "Haru smiles.\n\n" +
        "\"I've been keeping it for you.\"",
      ending: "The Promise of Tomorrow",
      endingKey: "hope"
    },

    // ======================================
    // ENDING TWO — THE NAME IN THE NOTEBOOK
    // ======================================

    bittersweet_1: {
      background: "rooftop",
      speaker: "haru",
      expression: "sad",
      text:
        "I don't know if I can keep you here.\n\n" +
        "But I can promise that what we had mattered.",
      next: "bittersweet_2"
    },

    bittersweet_2: {
      background: "rooftop",
      speaker: "ria",
      expression: "shy",
      text:
        "Then that's enough.\n\n" +
        "Thank you for seeing me, Haru.",
      next: "bittersweet_3"
    },

    bittersweet_3: {
      background: "station",
      text:
        "Spring arrives.\n\n" +
        "Haru can no longer remember the girl's face, " +
        "but he keeps an old notebook in his bag.",
      next: "bittersweet_ending"
    },

    bittersweet_ending: {
      background: "station",
      speaker: "haru",
      expression: "sad",
      text:
        "On the last page, there is a name written " +
        "over and over.\n\n" +
        "Ria.\n\n" +
        "I don't know why, but every time I read it, " +
        "I feel like someone is waiting for me.",
      ending: "The Name in the Notebook",
      endingKey: "bittersweet"
    }
  }
};

export const comics = [
  {
    id: 1,
    src: "/GoblinSlayer.jpg",
    alt: "GoblinSlayer",
    slug: "goblin-slayer-1",
    chapters: [
      {
        id: 1,
        chapter_num: "01",
        chapter_slug: "chapter-1",
        created_date: "Jan 30, 2022",
        like: "26.576",
      },
      {
        id: 2,
        chapter_num: "02",
        chapter_slug: "chapter-2",
        created_date: "Aug 31, 2022",
        like: "26.576",
      },
    ],
    title: "Goblin Slayer",
    tags: [
      { id: 1, name: "Sonen" },
      { id: 2, name: "Adventure" },
    ],
    created_date: "2022-07-09 14:41:45",
  },
  {
    id: 2,
    src: "/GoblinSlayer.jpg",
    alt: "GoblinSlayer",
    slug: "goblin-slayer-2",
    chapters: [
      {
        id: 1,
        chapter_num: "01",
        chapter_slug: "chapter-1",
        created_date: "Aug 31, 2022",
        like: "26.576",
      },
      {
        id: 2,
        chapter_num: "02",
        chapter_slug: "chapter-2",
        created_date: "Aug 31, 2022",
        like: "26.576",
      },
    ],
    title: "Goblin Slayer",
    tags: [
      { id: 1, name: "Sonen" },
      { id: 2, name: "Adventure" },
    ],
    created_date: "2022-09-19 14:41:45",
  },
  {
    id: 3,
    src: "/GoblinSlayer.jpg",
    alt: "GoblinSlayer",
    slug: "goblin-slayer-3",
    chapters: [
      {
        id: 1,
        chapter_num: "01",
        chapter_slug: "chapter-1",
        created_date: "Aug 31, 2022",
        like: "26.576",
      },
      {
        id: 2,
        chapter_num: "02",
        chapter_slug: "chapter-2",
        created_date: "Aug 31, 2022",
        like: "26.576",
      },
    ],
    title: "Goblin Slayer",
    tags: [
      { id: 1, name: "Sonen" },
      { id: 2, name: "Adventure" },
    ],
    created_date: "2022-09-09 14:41:45",
  },
  {
    id: 4,
    src: "/GoblinSlayer.jpg",
    alt: "GoblinSlayer",
    slug: "goblin-slayer-4",
    chapters: [
      {
        id: 1,
        chapter_num: "01",
        chapter_slug: "chapter-1",
        created_date: "Aug 31, 2022",
        like: "26.576",
      },
      {
        id: 2,
        chapter_num: "02",
        chapter_slug: "chapter-2",
        created_date: "Aug 31, 2022",
        like: "26.576",
      },
    ],
    title: "Goblin Slayer",
    tags: [
      { id: 1, name: "Sonen" },
      { id: 2, name: "Adventure" },
    ],
    created_date: "2022-09-09 14:41:45",
  },
  {
    id: 5,
    src: "/GoblinSlayer.jpg",
    alt: "GoblinSlayer",
    slug: "goblin-slayer-5",
    chapters: [
      {
        id: 1,
        chapter_num: "01",
        chapter_slug: "chapter-1",
        created_date: "Aug 31, 2022",
        like: "26.576",
      },
      {
        id: 2,
        chapter_num: "02",
        chapter_slug: "chapter-2",
        created_date: "Aug 31, 2022",
        like: "26.576",
      },
      {
        id: 3,
        chapter_num: "03",
        chapter_slug: "chapter-3",
        created_date: "Aug 31, 2022",
        like: "26.576",
      },
    ],
    title: "Goblin Slayer",
    tags: [
      { id: 1, name: "Sonen" },
      { id: 2, name: "Adventure" },
    ],
    created_date: "2022-09-09 14:41:45",
  },
];

export const comic = {
  id: 1,
  src: "/GoblinSlayer.jpg",
  alt: "GoblinSlayer",
  slug: "goblin-slayer",
  description:
    "Having a boyfriend who is a full foot taller than you might seem adorable at first, but it usually just ends up causing a whole bunch of minor inconveniences. Follow Fishball as she navigates the Malaysian life with her geeky boyfriend.",
  chapters: [
    {
      id: 1,
      chapter_num: "01",
      chapter_slug: "chapter-1",
      created_date: "2022-09-18 08:41:45",
      like: "26.576",
    },
    {
      id: 2,
      chapter_num: "02",
      chapter_slug: "chapter-2",
      created_date: "Aug 31, 2022",
      like: "26.576",
    },
    {
      id: 3,
      chapter_num: "03",
      chapter_slug: "chapter-3",
      created_date: "Aug 31, 2022",
      like: "26.576",
    },
    {
      id: 4,
      chapter_num: "04",
      chapter_slug: "chapter-4",
      created_date: "Aug 31, 2022",
      like: "26.576",
    },
  ],
  title: "Goblin Slayer",
  tags: [
    { id: 1, name: "Sonen" },
    { id: 2, name: "Adventure" },
  ],
  created_date: "2022-09-09 14:41:45",
  comments: [
    {
      id: 1,
      content: "This a root comment",
      creator: {
        id: "user-1",
        name: "DucHuy",
      },
      reply_to: null,
      created_date: "2022-09-09 14:41:45",
    },
    {
      id: 2,
      content: "This another root comment",
      creator: {
        id: "user-2",
        name: "Manh",
      },
      reply_to: null,
      created_date: "2022-09-09 14:41:45",
    },
    {
      id: 3,
      content: "This is a reply",
      creator: {
        id: "user-2",
        name: "Manh",
      },
      reply_to: 1,
      created_date: "2022-09-09 14:41:45",
    },
    {
      id: 4,
      content: "This a child of a reply",
      creator: {
        id: "user-1",
        name: "DucHuy",
      },
      reply_to: 3,
      created_date: "2022-09-09 14:41:45",
    },
  ],
};

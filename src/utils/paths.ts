export const paths = {
  home: "/",
  notes: "/notes",
  papers: "/papers",
  bookmarks: "/bookmarks",
  subject: (subjectCode: string) => `/subject/${subjectCode}`,
  subjectNotes: (subjectCode: string) => `/subject/${subjectCode}/notes`,
  topic: (subjectCode: string, topicId: string) =>
    `/subject/${subjectCode}/notes/${encodeURIComponent(topicId)}`,
  subjectPapers: (subjectCode: string) => `/subject/${subjectCode}/papers`,
};

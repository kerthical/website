import { marked } from 'marked';
import { useState } from 'react';

interface ArticleProps {
  isAuthenticated: boolean;
  result: {
    slug: string;
    title: string;
    content: string;
  };
}

function Article(props: ArticleProps) {
  const { result } = props;
  const [isEditing, setEditing] = useState(false);

  const [title, setTitle] = useState(result.title);
  const [editedTitle, setEditedTitle] = useState(result.title);

  const [content, setContent] = useState(result.content);
  const [editedContent, setEditedContent] = useState(result.content);

  const [isSaving, setSaving] = useState(false);
  const isDirty = title !== editedTitle || content !== editedContent;

  return (
    <div className="flex flex-col items-center p-8">
      <div className="flex w-full max-w-3xl flex-col gap-8 max-sm:max-w-full">
        <div className="flex w-full items-center justify-between">
          <a href="/" className="link-hover link flex items-center gap-1">
            <svg className="inline-block h-4 w-4" viewBox="0 0 22 22">
              <path fill="currentColor" d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6z"></path>
            </svg>
            Back
          </a>
          {props.isAuthenticated &&
            (isEditing ? (
              <div className="flex items-center gap-2">
                {isDirty && (
                  <button
                    className="btn btn-primary flex items-center gap-1"
                    disabled={isSaving}
                    onClick={() => {
                      setSaving(true);

                      fetch(`/api/articles/${result.slug}`, {
                        method: 'PUT',
                        credentials: 'include',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          title: editedTitle,
                          content: editedContent,
                        }),
                      })
                        .then(() => {
                          setTitle(editedTitle);
                          setContent(editedContent);
                          setEditing(false);
                        })
                        .finally(() => {
                          setSaving(false);
                        });
                    }}
                  >
                    Confirm
                    <svg className="inline-block h-4 w-4" viewBox="0 0 22 22">
                      <path
                        fill="currentColor"
                        d="M20 12a8 8 0 0 1-8 8a8 8 0 0 1-8-8a8 8 0 0 1 8-8c.76 0 1.5.11 2.2.31l1.57-1.57A9.822 9.822 0 0 0 12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10M7.91 10.08L6.5 11.5L11 16L21 6l-1.41-1.42L11 13.17z"
                      />
                    </svg>
                  </button>
                )}
                <button
                  className="btn btn-ghost flex items-center gap-1"
                  disabled={isSaving}
                  onClick={() => {
                    setEditing(!isEditing);
                    setEditedTitle(title);
                    setEditedContent(content);
                  }}
                >
                  {isDirty ? 'Cancel' : 'Close'}
                  <svg className="inline-block h-4 w-4" viewBox="0 0 22 22">
                    <path
                      fill="currentColor"
                      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <button className="btn btn-primary flex items-center gap-1" onClick={() => setEditing(!isEditing)}>
                Edit
                <svg className="inline-block h-4 w-4" viewBox="0 0 22 22">
                  <path
                    fill="currentColor"
                    d="M10 21H5c-1.11 0-2-.89-2-2V5c0-1.11.89-2 2-2h14c1.11 0 2 .89 2 2v5.33c-.3-.12-.63-.19-.96-.19c-.37 0-.72.08-1.04.23V5H5v14h5.11l-.11.11zM7 9h10V7H7zm0 8h5.11L14 15.12V15H7zm0-4h9.12l.88-.88V11H7zm14.7.58l-1.28-1.28a.55.55 0 0 0-.77 0l-1 1l2.05 2.05l1-1a.55.55 0 0 0 0-.77M12 22h2.06l6.05-6.07l-2.05-2.05L12 19.94z"
                  />
                </svg>
              </button>
            ))}
        </div>
        {isEditing ? (
          <input
            className="input w-full text-4xl font-bold"
            defaultValue={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
          />
        ) : (
          <h1 className="text-4xl font-bold">{title}</h1>
        )}
        {isEditing ? (
          <textarea
            className="textarea h-96 w-full"
            defaultValue={editedContent}
            onChange={e => setEditedContent(e.target.value)}
          />
        ) : (
          <div
            className="prose max-w-full"
            dangerouslySetInnerHTML={{
              __html: marked.parse(content, {
                gfm: true,
                breaks: true,
              }),
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Article;

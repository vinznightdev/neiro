/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, X, ChevronLeft, ChevronRight, Send, Star } from 'lucide-react';
import { PhotoItem, CommentItem } from '../types';

const INITIAL_PHOTOS: PhotoItem[] = [
  {
    id: 'original-puppy',
    url: 'https://www.image2url.com/r2/default/images/1786629568531-68a297a0-35bd-4d59-ac6e-a3878286e672.jpg',
    title: 'Street-Built Legend',
    description: 'The legendary NEIRO puppy standing proud as a true street model, representing strength, resilience, and unity.',
    category: 'hoodie',
    likes: 1240,
    comments: [
      { id: 'c1', author: 'Bella', text: 'Absolute perfection! This look represents the street vibe perfectly! 🐾🔥', timestamp: 'Just now' },
      { id: 'c2', author: 'Daisy', text: 'An absolute icon of community fashion!', timestamp: '2 hours ago' }
    ]
  },
  {
    id: 'sweet-hooded-explorer',
    url: 'https://www.image2url.com/r2/default/images/1786629556885-7efa1516-46bb-422d-bd91-63991596299d.jpg',
    title: 'Urban Cozy Companion',
    description: 'An adorable fluffy NEIRO companion looking exceptionally charming and cozy, ready to conquer the streets.',
    category: 'hoodie',
    likes: 1042,
    comments: [
      { id: 'c3', author: 'Daisy', text: 'This design look is too beautiful for words! 😍', timestamp: '3 hours ago' }
    ]
  },
  {
    id: 'pajama-naptime-pup',
    url: 'https://www.image2url.com/r2/default/images/1786629622757-becd828a-8ce0-41e7-862a-e5c4176d9f56.jpg',
    title: 'Official NEIRO Emblem',
    description: 'Our high-contrast official seal, depicting the ultimate digital puppy portrait with pure warmth.',
    category: 'sleepy',
    likes: 1180,
    comments: [
      { id: 'c4', author: 'Leo', text: 'Pure golden emblem quality. Truly magnificent!', timestamp: '5 hours ago' }
    ]
  }
];

export default function InteractiveGallery() {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'hoodie' | 'sleepy' | 'playful'>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Comments state inside Lightbox
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  // Local storage synchronization
  useEffect(() => {
    const saved = localStorage.getItem('puppy_haven_gallery_v4');
    if (saved) {
      try {
        setPhotos(JSON.parse(saved));
      } catch (e) {
        setPhotos(INITIAL_PHOTOS);
      }
    } else {
      setPhotos(INITIAL_PHOTOS);
    }
  }, []);

  const saveToStorage = (updatedPhotos: PhotoItem[]) => {
    setPhotos(updatedPhotos);
    localStorage.setItem('puppy_haven_gallery_v4', JSON.stringify(updatedPhotos));
  };

  const handleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = photos.map((p) => {
      if (p.id === id) {
        const hasLiked = localStorage.getItem(`liked_${id}`) === 'true';
        const updatedLikes = hasLiked ? p.likes - 1 : p.likes + 1;
        if (hasLiked) {
          localStorage.removeItem(`liked_${id}`);
        } else {
          localStorage.setItem(`liked_${id}`, 'true');
        }
        return { ...p, likes: updatedLikes };
      }
      return p;
    });
    saveToStorage(updated);
  };

  const isLiked = (id: string) => {
    return localStorage.getItem(`liked_${id}`) === 'true';
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (activePhotoIndex === null || !newCommentText.trim()) return;

    const currentPhoto = filteredPhotos[activePhotoIndex];
    const newComment: CommentItem = {
      id: `comment-${Date.now()}`,
      author: newCommentAuthor.trim() || 'Anonymous Pup',
      text: newCommentText.trim(),
      timestamp: 'Just now',
    };

    const updated = photos.map((p) => {
      if (p.id === currentPhoto.id) {
        return { ...p, comments: [newComment, ...p.comments] };
      }
      return p;
    });

    saveToStorage(updated);
    setNewCommentText('');
    setNewCommentAuthor('');
  };

  const filteredPhotos = photos.filter(
    (p) => filter === 'all' || p.category === filter
  );

  const activePhoto =
    activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3">
        {(['all', 'hoodie', 'sleepy', 'playful'] as const).map((cat) => (
          <button
            key={cat}
            id={`filter-tab-${cat}`}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center gap-2 ${
              filter === cat
                ? 'bg-amber-500 text-white shadow-md shadow-amber-300/40 dark:bg-violet-600 dark:shadow-violet-800/40'
                : 'bg-orange-100/70 text-orange-800 hover:bg-orange-200/50 dark:bg-indigo-950/40 dark:text-indigo-200 dark:hover:bg-indigo-900/40'
            }`}
          >
            <span>
              {cat === 'all' && '🐾 All Paws'}
              {cat === 'hoodie' && '🧥 Cozy Outfits'}
              {cat === 'sleepy' && '💤 Sleepy Dreams'}
              {cat === 'playful' && '🎈 Play Time'}
            </span>
            {filter === cat && (
              <motion.span layoutId="activeTabBadge" className="w-1.5 h-1.5 bg-white rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Grid of Puppy Cards */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredPhotos.map((photo, index) => {
            const liked = isLiked(photo.id);
            return (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                id={`puppy-card-${photo.id}`}
                onClick={() => setActivePhotoIndex(index)}
                className="group bg-white dark:bg-indigo-950/70 rounded-2xl overflow-hidden border border-orange-100 dark:border-indigo-900/30 shadow-sm hover:shadow-xl hover:border-amber-200 dark:hover:border-violet-800/40 transition-all cursor-pointer flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-orange-50 dark:bg-slate-900">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md dark:bg-slate-900/90 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm text-amber-700 dark:text-violet-300">
                    {photo.category === 'hoodie' && '🧥 Cozy Outfits'}
                    {photo.category === 'sleepy' && '💤 Sleepy'}
                    {photo.category === 'playful' && '🎈 Playful'}
                  </span>

                  {/* Likes Bubble */}
                  <button
                    id={`like-btn-card-${photo.id}`}
                    onClick={(e) => handleLike(photo.id, e)}
                    className={`absolute bottom-3 right-3 p-2.5 rounded-full shadow-md backdrop-blur-md border transition-all transform active:scale-75 ${
                      liked
                        ? 'bg-red-500 border-red-500 text-white hover:bg-red-600'
                        : 'bg-white/95 text-slate-700 hover:text-red-500 hover:bg-white dark:bg-slate-900/95 dark:text-slate-200 dark:hover:text-red-400 border-slate-100 dark:border-slate-800'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Info Text */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-50 group-hover:text-amber-600 dark:group-hover:text-violet-400 transition-colors">
                      {photo.title}
                    </h3>
                    <p className="text-sm text-slate-800 dark:text-indigo-150 font-medium line-clamp-2">
                      {photo.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-orange-50 dark:border-indigo-950/40 text-xs font-bold text-slate-750 dark:text-indigo-200">
                    <div className="flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
                      <span>{photo.likes} love-paws</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-sky-500" />
                      <span>{photo.comments.length} comments</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {activePhoto !== null && activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setActivePhotoIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-y-auto md:overflow-hidden shadow-2xl max-w-4xl w-full max-h-[95vh] md:max-h-[90vh] flex flex-col md:flex-row border border-slate-100 dark:border-slate-800"
            >
              {/* Media Column */}
              <div className="relative md:w-3/5 bg-slate-950 flex items-center justify-center min-h-[220px] md:min-h-0 shrink-0">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[50vh] md:max-h-[80vh] w-full object-contain"
                />

                {/* Left/Right Navigation */}
                {filteredPhotos.length > 1 && (
                  <>
                    <button
                      id="nav-left-btn"
                      onClick={() =>
                        setActivePhotoIndex(
                          (activePhotoIndex - 1 + filteredPhotos.length) %
                            filteredPhotos.length
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 dark:bg-slate-900/30 dark:hover:bg-slate-900/60 text-white p-2.5 rounded-full transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      id="nav-right-btn"
                      onClick={() =>
                        setActivePhotoIndex(
                          (activePhotoIndex + 1) % filteredPhotos.length
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 dark:bg-slate-900/30 dark:hover:bg-slate-900/60 text-white p-2.5 rounded-full transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Interaction Details Column */}
              <div className="md:w-2/5 p-5 md:p-6 flex flex-col justify-between bg-orange-50/25 dark:bg-slate-900 flex-1">
                {/* Header */}
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
                      {activePhoto.title}
                    </h2>
                    <button
                      id="close-lightbox-btn"
                      onClick={() => setActivePhotoIndex(null)}
                      className="p-1.5 rounded-full bg-orange-100 hover:bg-orange-200 text-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {activePhoto.description}
                  </p>

                  <div className="flex items-center justify-between pb-3 border-b border-orange-100 dark:border-slate-800">
                    <button
                      id="lightbox-like-btn"
                      onClick={() => handleLike(activePhoto.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold shadow-sm transition-all transform active:scale-95 border ${
                        isLiked(activePhoto.id)
                          ? 'bg-red-500 border-red-500 text-white'
                          : 'bg-white border-slate-100 text-slate-700 hover:text-red-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${isLiked(activePhoto.id) ? 'fill-current' : ''}`}
                      />
                      <span>{activePhoto.likes} Love-Paws</span>
                    </button>

                    <div className="text-xs text-slate-400 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{activePhoto.category.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="flex-1 my-4 flex flex-col min-h-0">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Pawsome Comments ({activePhoto.comments.length})
                  </h4>

                  {/* Scrollable Comments Box */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[160px] md:max-h-none">
                    {activePhoto.comments.length === 0 ? (
                      <p className="text-xs text-slate-400 italic text-center py-4">
                        No barks yet. Be the first to leave a comment!
                      </p>
                    ) : (
                      activePhoto.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="p-3 bg-white dark:bg-slate-800/60 rounded-2xl border border-orange-50 dark:border-slate-800/40 text-xs space-y-1 shadow-sm"
                        >
                          <div className="flex justify-between text-slate-400 font-semibold">
                            <span className="text-amber-700 dark:text-violet-300">
                              🐶 {comment.author}
                            </span>
                            <span>{comment.timestamp}</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-200 leading-relaxed">
                            {comment.text}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Form to Post Comment */}
                <form onSubmit={handleAddComment} className="space-y-2 mt-2 pt-2 border-t border-orange-100 dark:border-slate-800">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="comment-author-input"
                      placeholder="Your Paw Name..."
                      value={newCommentAuthor}
                      onChange={(e) => setNewCommentAuthor(e.target.value)}
                      maxLength={20}
                      className="w-1/3 text-xs bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-full px-3 py-2 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-400 dark:focus:ring-violet-500"
                    />
                    <div className="flex-1 flex gap-1 relative">
                      <input
                        type="text"
                        id="comment-text-input"
                        placeholder="Say something sweet..."
                        required
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        maxLength={120}
                        className="w-full text-xs bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-full pl-3 pr-9 py-2 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-400 dark:focus:ring-violet-500"
                      />
                      <button
                        type="submit"
                        id="comment-submit-btn"
                        className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-amber-500 text-white hover:bg-amber-600 dark:bg-violet-600 dark:hover:bg-violet-700 transition-colors cursor-pointer"
                      >
                        <Send className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

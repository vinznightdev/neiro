/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CommentItem {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  description: string;
  category: 'hoodie' | 'sleepy' | 'playful';
  likes: number;
  comments: CommentItem[];
}

export interface VirtualPetState {
  happiness: number;
  energy: number;
  hunger: number;
  hoodieColor: string;
  accessory: 'none' | 'glasses' | 'bandana' | 'crown' | 'headphones';
  currentAction: 'idle' | 'sleeping' | 'eating' | 'playing' | 'barking';
}

export interface BarkPreset {
  id: string;
  name: string;
  icon: string;
  pitch: number;      // Pitch multiplier or frequency offset
  decay: number;      // Quickness of bark envelope
  frequency: number;  // Base frequency in Hz
  description: string;
}

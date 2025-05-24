import { saveToCache, loadFromCache } from './cache';

const API_URL = 'https://exercisedb.p.rapidapi.com/exercises?limit=0'; // Get ALL exercises
const API_HEADERS = {
  'X-RapidAPI-Key': '75efadd082mshcb6abb785e9ff7dp183c8bjsn06af1a9e0891',
  'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
};

let cachedExercises = null;

export async function fetchAllExercises() {
  if (cachedExercises) return cachedExercises;

  try {
    const response = await fetch(API_URL, { headers: API_HEADERS });
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Failed to fetch exercises');
    }

    const data = await response.json();
    cachedExercises = data;
    return data;
  } catch (error) {
    throw error;
  }
}


export async function getExerciseByName(name) {
  const cacheKey = `exercise_${name.toLowerCase().trim()}`

  try {
    const cached = await loadFromCache(cacheKey);
    if (cached) {
      console.log(`[CACHE HIT] for "${name}"`);
      return cached;
    }

    const allExercises = await fetchAllExercises();
    const searchTerm = name.toLowerCase().trim();

    const exactMatch = allExercises.find(ex => 
      ex.name.toLowerCase() === searchTerm
    );
    
    const normalizedMatch = allExercises.find(ex => 
      ex.name.toLowerCase().replace(/[^a-z0-9\s]/g, '') === 
      searchTerm.replace(/[^a-z0-9\s]/g, '')
    );

    const partialMatch = allExercises.find(ex => 
      ex.name.toLowerCase().includes(searchTerm) ||
      searchTerm.includes(ex.name.toLowerCase())
    );

    const matchedExercise = exactMatch || normalizedMatch || partialMatch;

    if (!matchedExercise) {
      throw new Error(`"${name}" not found in ${allExercises.length} exercises`);
    }

    await saveToCache(cacheKey, matchedExercise);
    console.log(`[CACHE SAVE] for "${name}"`);

    return matchedExercise;
  } catch (error) {
    throw error;
  }
}

-- Create function for semantic memory search using pgvector
CREATE OR REPLACE FUNCTION public.match_memories(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 5,
  p_agent_id uuid DEFAULT NULL,
  p_category text DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  content text,
  memory_type text,
  memory_category text,
  importance float,
  similarity float
)
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    am.id,
    am.content,
    am.memory_type,
    am.memory_category,
    am.importance::float,
    (1 - (am.embedding <=> query_embedding))::float as similarity
  FROM agent_memory am
  WHERE 
    am.embedding IS NOT NULL
    AND (p_agent_id IS NULL OR am.agent_id = p_agent_id)
    AND (p_category IS NULL OR am.memory_category = p_category)
    AND (1 - (am.embedding <=> query_embedding)) > match_threshold
  ORDER BY am.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
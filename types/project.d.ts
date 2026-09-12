declare interface IProject {
  id: string;
  user_id?: string | null;
  name: string;
  description?: string | null;
  source_language: string;
  target_language: string;
  status:
    | "DRAFT"
    | "READY"
    | "QUEUED"
    | "TRANSLATING"
    | "COMPLETED"
    | "FAILED"
    | "CANCELLED";
  submit_kind: "REPLACE" | "APPEND_TEXT" | "APPEND_BLOCK";
  custom_instructions?: string | null;
  original_filename?: string | null;
  source_file_path?: string | null;
  output_file_path?: string | null;
  cache_dir_path?: string | null;
  llm_provider?: string;
  llm_model?: string | null;
  custom_api_base?: string | null;
  has_custom_api_key?: boolean;
  masked_api_key?: string | null;
  telegram_notifications_enabled?: boolean;
  telegram_chat_id?: string | null;
  telegram_bot_token?: string | null;
  global_tm_enabled?: boolean;
  is_guest?: boolean;
  expires_at?: string | null;
  epub_metadata?: {
    title?: string;
    author?: string;
    language?: string;
  } | null;
  created_at: string;
  updated_at: string;
}

declare interface IChapter {
  id: string;
  project_id: string;
  order: number;
  title?: string | null;
  source_identifier: string;
  status: "PENDING" | "TRANSLATING" | "COMPLETED" | "FAILED" | "REFUSED";
  input_tokens?: number;
  cached_input_tokens?: number;
  output_tokens?: number;
  started_at?: string | null;
  completed_at?: string | null;
  created_at: string;
}

declare interface IChapterPreview {
  chapter_id: string;
  title?: string | null;
  original_html?: string | null;
  translated_html?: string | null;
  translation_available: boolean;
}

declare interface IChunkDetail {
  id: string;
  project_id: string;
  chapter_id: string;
  chunk_index: number;
  source_text: string;
  translated_text: string | null;
  active_text: string | null;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED" | "REFUSED";
  quality_status: "PASSED" | "FLAGGED" | "REFUSED" | "BYPASSED";
  quality_issues?: string[] | null;
  has_revisions: boolean;
  latest_revision_number: number;
  created_at: string;
  updated_at: string;
}

declare interface IChunkRevision {
  id: string;
  chunk_id: string;
  revision_number: number;
  previous_text: string;
  revised_text: string;
  editor_type: "AI" | "USER" | "SYSTEM";
  comment?: string | null;
  created_at: string;
}

declare interface ICandidateTerm {
  id: string;
  project_id: string;
  extraction_run_id: string;
  term_type: "TERM" | "CHARACTER";
  source_term: string;
  suggested_translation: string;
  confidence: number;
  occurrences: number;
  notes?: string | null;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "EDITED";
  created_at: string;
}

declare interface ISemanticTMResult {
  source_text: string;
  translated_text: string;
  source_language: string;
  target_language: string;
  similarity: number;
  use_count: number;
}

declare interface ITranslationJob {
  id: string;
  project_id: string;
  celery_task_id?: string | null;
  status:
    | "QUEUED"
    | "TRANSLATING"
    | "CANCEL_REQUESTED"
    | "CANCELLED"
    | "COMPLETED"
    | "FAILED";
  progress: number;
  current_stage?: string | null;
  input_tokens: number;
  output_tokens: number;
  cached_tokens: number;
  error_message?: string | null;
  started_at?: string | null;
  completed_at?: string | null;
  created_at: string;
  updated_at: string;
}

declare interface IGlossaryEntry {
  id: string;
  project_id: string;
  source_term: string;
  target_term: string;
  description?: string | null;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

declare interface IProjectAnalytics {
  project_id: string;
  total_chunks: number;
  completed_chunks: number;
  tm_hits: number;
  llm_calls: number;
  tm_hit_rate: number;
  input_tokens: number;
  cached_input_tokens: number;
  output_tokens: number;
  estimated_cost_usd: number | null;
}

declare interface ITranslationRun {
  id: string;
  project_id: string;
  job_id?: string | null;
  type: "INITIAL" | "RESUME" | "RETRY" | "RETRANSLATE";
  status: "QUEUED" | "RUNNING" | "COMPLETED" | "FAILED" | "CANCELLED";
  model?: string | null;
  provider?: string | null;
  ignore_tm: boolean;
  use_glossary: boolean;
  use_previous_as_input: boolean;
  custom_instructions?: string | null;
  selected_chapter_ids?: string[] | null;
  input_tokens: number;
  output_tokens: number;
  cached_tokens: number;
  created_at: string;
  completed_at?: string | null;
}

declare interface IRetranslateChaptersPayload {
  chapter_ids: string[];
  ignore_tm?: boolean;
  use_glossary?: boolean;
  use_previous_as_input?: boolean;
  custom_instructions?: string;
}

declare interface IRetryFailedChaptersPayload {
  chapter_ids?: string[];
  ignore_tm?: boolean;
  use_glossary?: boolean;
}

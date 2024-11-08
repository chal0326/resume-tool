export const Database = {
  public: {
    Tables: {
      // Job table structure
      res_jobs: {
        Row: {
          company: '',
          created_at: '',
          end_date: null,
          id: '',
          job_title: '',
          start_date: '',
          user_id: null,
        },
        Insert: {
          company: '',
          created_at: undefined,
          end_date: null,
          id: undefined,
          job_title: '',
          start_date: '',
          user_id: null,
        },
        Update: {
          company: undefined,
          created_at: undefined,
          end_date: null,
          id: undefined,
          job_title: undefined,
          start_date: undefined,
          user_id: null,
        },
        Relationships: [],
      },

      // Experiences table structure
      res_experiences: {
        Row: {
          created_at: '',
          experience_text: '',
          id: '',
          job_id: null,
        },
        Insert: {
          created_at: undefined,
          experience_text: '',
          id: undefined,
          job_id: null,
        },
        Update: {
          created_at: undefined,
          experience_text: undefined,
          id: undefined,
          job_id: null,
        },
        Relationships: [
          {
            foreignKeyName: 'res_experiences_job_id_fkey',
            columns: ['job_id'],
            isOneToOne: false,
            referencedRelation: 'res_jobs',
            referencedColumns: ['id'],
          },
        ],
      },
    },
    Enums: {},
    CompositeTypes: {},
  },
};

// Helper functions for accessing job and experience data structures
export function getTableRow(tableName) {
  const tables = Database.public.Tables;
  return tables[tableName] ? tables[tableName].Row : null;
}

export function getTableInsertData(tableName) {
  const tables = Database.public.Tables;
  return tables[tableName] ? tables[tableName].Insert : null;
}

export function getTableUpdateData(tableName) {
  const tables = Database.public.Tables;
  return tables[tableName] ? tables[tableName].Update : null;
}

// Example usage for enums if you expand this file in the future
export const Enums = (enumName) => Database.public.Enums[enumName];

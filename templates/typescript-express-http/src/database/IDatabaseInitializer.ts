export interface IDatabaseInitializer {
    initializeDatabase(): Promise<void>
}

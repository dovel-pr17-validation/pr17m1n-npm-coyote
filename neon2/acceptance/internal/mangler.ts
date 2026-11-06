export class Mangler {
  private counter: number = 0;
  private availableToDecode: Record<string, string> = {};

  encoded(name: string): string {
    if (this.hasAssignedHash(name)) {
      return this.assignedHash(name);
    }
    const hash = this.randomizeString(name);
    this.availableToDecode[hash] = name;
    return hash;
  }

  private randomizeString(name: string): string {
    return '(' + this.randomString() + ') ' + name;
  }

  private hasAssignedHash(name: string): boolean {
    return Object.values(this.availableToDecode).indexOf(name) > -1;
  }

  private assignedHash(name: string): string {
    for (const [hash, hashName] of Object.entries(this.availableToDecode)) {
      if (hashName === name) {
        return hash;
      }
    }
    throw new Error('Failed to lookup hash.');
  }

  decoded(hash: string): string {
    if (this.availableToDecode.hasOwnProperty(hash)) {
      return this.availableToDecode[hash];
    }
    return hash;
  }

  decodedAll(hashes: string[]): string[] {
    return hashes.map(hash => this.decoded(hash));
  }

  private randomString(): string {
    this.counter++;
    return Date.now().toString(36) + this.counter.toString(36);
  }

  invalidate(): void {
    this.availableToDecode = {};
  }
}

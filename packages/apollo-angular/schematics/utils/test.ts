import {join} from 'path';

import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';

const collectionPath = join(__dirname, '../collection.json');

export async function createTestApp(appOptions = {}): Promise<UnitTestTree> {
  const runner = new SchematicTestRunner('apollo-angular', collectionPath);

  const workspaceTree = await runner
    .runExternalSchematicAsync('@schematics/angular', 'workspace', {
      name: 'workspace',
      version: '11.0.0',
      newProjectRoot: 'projects',
    })
    .toPromise();

  return runner
    .runExternalSchematicAsync(
      '@schematics/angular',
      'application',
      {
        ...appOptions,
        name: 'apollo',
      },
      workspaceTree,
    )
    .toPromise();
}

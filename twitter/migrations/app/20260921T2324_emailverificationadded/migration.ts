#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/7f1cc777f1e6cfd7cb27b6730e013ebc811b8d4c93cc057dfd510b79ad4e0307/contract';
import startContract from '../../snapshots/7f1cc777f1e6cfd7cb27b6730e013ebc811b8d4c93cc057dfd510b79ad4e0307/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/f1079a1760efda41a9547ff2a8840cf3e71de6234d5b87732417a6ae37996619/contract';
import endContract from '../../snapshots/f1079a1760efda41a9547ff2a8840cf3e71de6234d5b87732417a6ae37996619/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'emailVerificationToken',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('expiresAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('tokenHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('emailVerified', 'bool', {
          notNull: true,
          default: lit(false),
          codecRef: { codecId: 'pg/bool@1' },
        }),
      }),
      this.dropNotNull({ schema: 'public', table: 'user', column: 'email' }),
      this.dropNotNull({ schema: 'public', table: 'user', column: 'password' }),
      this.dropNotNull({ schema: 'public', table: 'user', column: 'username' }),
      this.addUnique({
        schema: 'public',
        table: 'emailVerificationToken',
        constraint: 'emailVerificationToken_tokenHash_key',
        columns: ['tokenHash'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'emailVerificationToken',
        index: 'emailVerificationToken_expiresAt_idx_6b6b8c10',
        columns: ['expiresAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'emailVerificationToken',
        index: 'emailVerificationToken_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'emailVerificationToken',
        foreignKey: {
          name: 'emailVerificationToken_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);

// src/pusher/pusher.service.ts
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();
import Pusher = require('pusher');

@Injectable()
export class PusherService {
  private pusher: Pusher;

  constructor() {
    const { app_id, key, secret, cluster } = process.env;

    if (!app_id || !key || !secret || !cluster) {
      throw new Error('Missing Pusher environment variables!');
    }

    this.pusher = new Pusher({
      appId: app_id,
      key: key,
      secret: secret,
      cluster: cluster,
      useTLS: true,
    });
  }

  trigger(channel: string, event: string, data: any) {
    return this.pusher.trigger(channel, event, data);
  }
}

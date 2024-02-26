import { Test, TestingModule } from '@nestjs/testing';
import { RandomFriendGateway } from './random-friend.gateway';

describe('RandomFriendGateway', () => {
  let gateway: RandomFriendGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomFriendGateway],
    }).compile();

    gateway = module.get<RandomFriendGateway>(RandomFriendGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

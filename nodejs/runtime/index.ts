import { process } from './process';
import { getInternalBinding } from './getInternalBinding';
import { getLinkedBinding } from './getLinkedBinding';
import { main } from '../lib/internal/bootstrap/loaders';
import * as primordials from './primordials';

main(
  process, 
  getLinkedBinding,
  getInternalBinding,
  primordials
)
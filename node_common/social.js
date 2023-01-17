import * as Environment from "~/node_common/environment";
import * as Strings from "~/common/strings";
import * as Logging from "~/common/logging";

import { IncomingWebhook } from "@slack/webhook";

// NOTE(jim): #fil-slate-social
const url = `https://hooks.slack.com/services/${Environment.SOCIAL_SLACK_WEBHOOK_KEY}`;
const webhook = new IncomingWebhook(url);

export const sendSlackMessage = (message) => {
  if (Strings.isEmpty(Environment.SOCIAL_SLACK_WEBHOOK_KEY)) {
    return;
  }

  try {
    webhook.send({ text: message });
  } catch (e) {
    Logging.error("SLACK_MESSAGE_FAILURE", message);
  }
};

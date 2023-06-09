import { PrismaClient, Prisma } from "@prisma/client";
import { Session } from "next-auth";

type ContextType = {
  session: Session | null;
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
};

const getAccessToken = async ({ ctx }: { ctx: ContextType }) => {
  let userAccount = await ctx.prisma.account.findFirstOrThrow({
    where: {
      userId: ctx.session!.user.id,
    },
  });
  return userAccount.access_token;
};

export default getAccessToken;

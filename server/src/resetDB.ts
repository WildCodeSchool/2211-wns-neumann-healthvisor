import datasource from './db';
import Page from './entity/Page';
import History from './entity/History';
import User, { hashPassword } from './entity/User';

const reset = async (): Promise<void> => {
    await datasource.initialize();
    await datasource.getRepository(History).delete({});
    await datasource.getRepository(User).delete({});
    await datasource.getRepository(Page).delete({});

    await datasource.getRepository(User).save({
        name: "test0",
        email: "test0@test.fr",
        password: await hashPassword("test0000")
    });
    await datasource.getRepository(User).save({
        name: "test1",
        email: "test1@test.fr",
        password: await hashPassword("test1111"),
    });

    await datasource.destroy();
    console.log("Done !");
}

reset().catch(err => console.error(err));
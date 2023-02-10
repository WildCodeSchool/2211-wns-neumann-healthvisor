import datasource from './db';
import User, { hashPassword } from './entity/User';

const reset = async (): Promise<void> => {
    await datasource.initialize();
    await datasource.getRepository(User).delete({});
    await datasource.getRepository(User).save({
        email: "test0@test.fr",
        password: await hashPassword("test0000")
    });

    await datasource.destroy();
    console.log("Done !");
}

reset().catch(err => console.error(err));
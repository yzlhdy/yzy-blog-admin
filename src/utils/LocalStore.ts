/**
 * 基于 class封装本地存储
 */

const store = window.localStorage;

class LocalStore {

    /**
     *
     *
     * @static
     * @param {string} key 存储的属性名字
     * @param {*} value 存储 的值
     * @returns
     * @memberof LocalStore
     */
    public static set(key: string, value: any) {
        if (!store) {
            return;
        }
        let v = value;
        try {
            if (typeof value === "object") {
                v = JSON.stringify(v)
                store.setItem(key, v)
            }
        } catch (error) {
        }
    }

    /**
     *
     *
     * @static
     * @param {string} key 获取的键名字
     * @returns
     * @memberof LocalStore
     */
    public static get(key: string) {
        if (!store) {
            return;
        }

        return store.getItem(key)
    }

    /**
     *
     *
     * @static
     * @param {string} key 获取的值为 object 时转换
     * @returns
     * @memberof LocalStore
     */
    public static get2Json(key: string) {
        if (!store) {
            return;
        }

        const data = store.getItem(key);
        if (data) {
            try {
                return JSON.parse(data)
            } catch (error) {

            }
        }
    }

    /**
     *
     *
     * @static
     * @param {string} key 删除的键名称
     * @returns
     * @memberof LocalStore
     */
    public static remove(key: string) {
        if (!store) {
            return;
        }
        try {
            return store.removeItem(key)
        } catch (error) {

        }
    }


}

export default LocalStore;
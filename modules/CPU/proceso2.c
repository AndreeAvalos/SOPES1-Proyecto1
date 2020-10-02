#include <linux/module.h>
#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/proc_fs.h>
#include <linux/sched.h>
#include <linux/uaccess.h>
#include <linux/fs.h>
#include <linux/sysinfo.h>
#include <linux/seq_file.h>
#include <linux/slab.h>
#include <linux/mm.h>
#include <linux/swap.h>


static int meminfo_proc_show(struct seq_file *m, void *v){
    struct sysinfo sys_info;
    unsigned long cpu;
    unsigned long usage;
    si_meminfo(&sys_info);
    
    cpu = sys_info.loads[0]*100/4;
    usage = cpu/(1 << SI_LOAD_SHIFT);

    seq_printf(m,"CPU: %ld %%",usage);
    
    return 0;
}

static ssize_t proc_write(struct file *file, const char __user *buffer, size_t count, loff_t *f_pos){
    return 0;
}
static int meminfo_proc_open(struct inode *inode, struct file *file){
    return single_open(file, meminfo_proc_show, NULL);
}
static const struct file_operations meminfo_proc_fops = {
    .owner = THIS_MODULE,
    .open = meminfo_proc_open,
    .read = seq_read,
    .llseek = seq_lseek,
    .release = single_release,
    .write = proc_write
};

static int __init inicio(void){
    
    struct proc_dir_entry *entry;
    entry = proc_create("cpu-info",0777,NULL, &meminfo_proc_fops);
    if(!entry){
        return -1;
    }else{
        printk(KERN_INFO "Carlos Andree Avalos Soto");
        return 0;
    }
}

static void __exit Terminar(void){
    remove_proc_entry("cpu-info", NULL);
    printk(KERN_INFO "Sistemas Operativos 1\n");
}


module_init(inicio);
module_exit(Terminar);
MODULE_LICENSE("GPL");